/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-loop-func */
/* eslint-disable @lwc/lwc/no-async-operation */
/* eslint-disable vars-on-top */

import { api, LightningElement, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
import { deleteRecord } from "lightning/uiRecordApi";
import {  subscribe,  unsubscribe,  onError,  setDebugFlag,  isEmpEnabled} from "lightning/empApi";
import getRelatedFilesByRecordId from "@salesforce/apex/fileDownloadDatatableController.getRelatedFilesByRecordId";
import deleteSelectedFiles from "@salesforce/apex/fileDownloadDatatableController.deleteSelectedFiles";
import JSPDF from '@salesforce/resourceUrl/jsPDF';
import img from '@salesforce/resourceUrl/user_image';
import { loadScript } from 'lightning/platformResourceLoader';

const COLUMNS = [
  { label: "File Name", fieldName: "Title", wrapText: true },
  { label: "Download",type: "button-icon",initialWidth: 100,
    typeAttributes: {
      title: "Download file",
      label: "Download",
      name: "Download",
      iconName: "action:download",
      iconPosition: "right"
    }
  }
];
export default class FileDownloadFeatureDataTable extends NavigationMixin( LightningElement) {
  @api recordId;
  @api showFileType = false;
  @api showFileSize = false;
  @api showPreview = false;
  @api showDelete = false;
  @api showLMD = false;
  channelName = '/event/Files_Platform_Event__e';
  subscription = {};
  responseMessage;
  wiredList = [];
  filesList = [];
  columns = COLUMNS;
  initialRecords;
  zip = "";
  count = false;
  receivedData = [];
  formattedData = [];
  deleteArr = [];
  isSpinner = false;
  isModalOpen = false;
  rowToDelete;
  isDisplayMsg = false;
  contactList=[]
  image;
  @wire(getRelatedFilesByRecordId, { recordId: "$recordId" })
  getAttachments(result) {
    this.wiredList = [];
    this.filesList = [];
    this.receivedData = [];
    this.formattedData = [];
    this.wiredList = result;
    if (result.data) {
      let parsedData = result.data;
      parsedData = Object.assign({}, parsedData);
      this.receivedData = Object.entries(parsedData);
      for (let index = 0; index < this.receivedData.length; index++) {
        this.receivedData[index] = this.receivedData[index][1];
      }
      this.receivedData.forEach((file) => {
        const modifiedSize = this.formatBytes(file.ContentDocument.ContentSize,2);
        const modifiedDate = this.formatDate(file.LastModifiedDate);
        let obj = {
          Title: file.Title,
          Size: modifiedSize,
          FileType: file.FileType,
          ContentDocumentId: file.ContentDocumentId,
          LastModifiedDate: modifiedDate
        };
        this.formattedData.push(obj);
      });
      this.receivedData = this.formattedData;
      this.initialRecords = this.receivedData;
      this.filesList = this.receivedData;
      if (this.filesList.length > 0) {
        this.count = true;
      }
    }
    if (result.error) {
      console.log(result.error);
    }
  }
  connectedCallback() {
    this.image = img;
    this.handleSubscribe();
    if (this.showFileType === true) {
      this.columns = [...this.columns,{ label: "File Type", fieldName: "FileType", initialWidth: 100 }];
    }
    if (this.showFileSize === true) {
      this.columns = [...this.columns,{ label: "File Size", fieldName: "Size", type: "String",initialWidth: 100 }];
    }
    if (this.showPreview === true) {
      this.columns = [...this.columns,
        { label: "Preview",type: "button", initialWidth: 120,
          typeAttributes: {
            label: "view",
            name: "Preview",
            variant: "brand-outline",
            iconName: "utility:preview",
            iconPosition: "right"
          }
        }
      ];
    }
    if (this.showDelete === true) {
      this.columns = [...this.columns,
        { label: "Delete",type: "button-icon",initialWidth: 80,
          typeAttributes: {
            title: "Delete file",
            label: "Delete",
            name: "Delete",
            iconName: "action:delete"
          }
        }
      ];
    }
    if (this.showLMD === true) {
      this.columns = [...this.columns,{ label: "Last Modified Date", fieldName: "LastModifiedDate" }];
    }
  }

  headers = this.createHeaders([
		"ContentDocumentId",
    "FileType",
    "LastModifiedDate",
    "Size",
    "Title"
	]);

	renderedCallback() {
		Promise.all([
			loadScript(this, JSPDF)
		]);
	}


  formatBytes(bytes, decimals) {
    if (bytes === 0) 
        return "0 Bytes";
    var k = 1024,
    dm = decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  formatDate(str) {
    let temp = str.substring(0, str.length - 5);
    temp = temp.replace(/T/g, " , ");
    return temp;
  }
  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    this.rowToDelete = row;
    switch (actionName) {
      case "Preview":
        this.previewFile(row);
        break;
      case "Download":
        this.downloadFile(row);
        break;
      case "Delete":
        this.handleModal();
        break;
      default:
    }
  }
  previewFile(file) {
    this[NavigationMixin.Navigate]({
      type: "standard__namedPage",
      attributes: {
        pageName: "filePreview"
      },
      state: {
        selectedRecordId: file.ContentDocumentId
      }
    });
  }
  downloadFile(file) {
    this[NavigationMixin.Navigate](
      {
        type: "standard__webPage",
        attributes: {
          url: `/sfc/servlet.shepherd/document/download/${file.ContentDocumentId}`
        }
      }, false);
  }
  handleModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  deleteFile() {
    deleteRecord(this.rowToDelete.ContentDocumentId)
      .then(() => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success!!",
            message: "Record deleted!!",
            variant: "success"
          })
        );
      })
      .then(() => {
        if (this.filesList.length === 1) {
          this.count = false;
        }
        this.isModalOpen = false;
      });
  }
  handleSearch(event) {
    const searchKey = event.target.value.toLowerCase();
    if (searchKey) {
      this.filesList = this.receivedData;
      if (this.filesList) {
        let recs = [];
        for (let rec of this.filesList) {
          let valuesArray = Object.values(rec);
          for (let val of valuesArray) {
            let strVal = String(val);
            if (strVal) {
              if (strVal.toLowerCase().includes(searchKey)) {
                recs.push(rec);
                break;
              }
            }
          }
        }
        this.filesList = recs;
      }
    } else {
      this.filesList = this.initialRecords;
    }
  }
  checkboxDownloadHandler() {
    var rows = this.template
      .querySelector("lightning-datatable")
      .getSelectedRows();
    var rowArray = Array.from(rows);
    rowArray.forEach((item) => {
      this.zip += "/" + item.ContentDocumentId;
    });
    if (this.zip.length === 0) {
      const event = new ShowToastEvent({
        title: "Error",
        message: "Please select atleast one file!",
        variant: "error"
      });
      this.dispatchEvent(event);
    } else {
      this.getZip();
    }
  }
  getZip() {
    this[NavigationMixin.Navigate](
      {
        type: "standard__webPage",
        attributes: {
          url: `/sfc/servlet.shepherd/document/download/${this.zip}`
        }
      },false);
    setTimeout(() => {
      this.showToast();
    }, 3000);
    this.zip = "";
  }
  showToast() {
    const event = new ShowToastEvent({
      title: "Success",
      message: "Files downloaded successfully!!",
      variant: "success"
    });
    this.dispatchEvent(event);
  }
  checkboxDeleteHandler() {
    var rows = this.template
      .querySelector("lightning-datatable")
      .getSelectedRows();
    var rowArray = Array.from(rows);
    rowArray.forEach((item) => {
      this.deleteArr.push(item.ContentDocumentId);
    });
    if (rowArray.length > 0) {
      deleteSelectedFiles({ fileIds: this.deleteArr })
        .then(() => {
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Success!!",
              message: rowArray.length + " record(s) deleted!!",
              variant: "success"
            })
          );
        })
        .then(() => {
          if (rowArray.length === this.filesList.length)
           this.count = false;
        });
    } else {
      const evt = new ShowToastEvent({
        title: "Error",
        message: "Please select atleast one file!",
        variant: "error"
      });
      this.dispatchEvent(evt);
    }
  }
  refreshHandler() {
    this.isSpinner = true;
    this.formattedData = [];
    setTimeout(() => {
      this.isSpinner = false;
    }, 1000);
    refreshApex(this.wiredList);
  }
  handleUploadFinished(event) {
    const uploadedFiles = event.detail.files.length;
    this.dispatchEvent(
      new ShowToastEvent({
        title: "SUCCESS",
        message: uploadedFiles + " File(s) uploaded  successfully",
        variant: "success"
      })
    );
  }
handleSubscribe() {
    const messageCallback = (response) => {
      console.log("New message received: ", JSON.stringify(response));
      if(response.data.payload.ParentRecordId__c === this.recordId || response.data.payload.UserId__c === this.recordId){
        this.refreshHandler();
      }
    };
    subscribe(this.channelName, -1, messageCallback).then((response) => {
        this.subscription = response;
      });
  }

  rowArray = []
  handlePrint(event){
    var rows = this.template
    .querySelector("lightning-datatable")
    .getSelectedRows();
      this.rowArray = Array.from(rows);
      this.contactList = this.rowArray;
      console.log(this.rowArray);
      this.generate();

  }
  generate(){
		const { jsPDF } = window.jspdf;
    const logo = this.template.querySelector('.image');
		const doc = new jsPDF('landscape','mm', [197, 350])//{
    
	//	doc.text("Hi", 20, 20);
   // doc.setFontSize(2);
    doc.addImage(img,'PNG',10,10,50,50);
		doc.table(35, 65, this.contactList, this.headers, { autosize:true });
		doc.save("demo.pdf");
	}
  createHeaders(keys) {
		  let result = [];
      for (var i = 0; i < keys.length; i = i+1) {
       // console.log(keys[i]);
            result.push({
              id: keys[i],
              name: keys[i],
              prompt: keys[i],
              width: 65,
              align: "center",
              padding: 0
            });
		}
		return result;
	}
}