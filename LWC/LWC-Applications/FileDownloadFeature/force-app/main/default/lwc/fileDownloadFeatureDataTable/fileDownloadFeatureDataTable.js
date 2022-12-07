/* eslint-disable @lwc/lwc/no-async-operation */
/* eslint-disable vars-on-top */

import { api, LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from'lightning/platformShowToastEvent';
import getRelatedFilesByRecordId from '@salesforce/apex/fileDownloadDatatableController.getRelatedFilesByRecordId'
const COLUMNS = [
    { label: 'File Name', fieldName : 'Title'},   
    { label:'Download', type : 'button-icon', typeAttributes:{
        label: 'Download',  
        name: 'Download',  
        iconName: 'action:download',     
        iconPosition: 'right'
    }}
]
export default class FileDownloadFeatureDataTable extends NavigationMixin(LightningElement) {
    @api recordId
    @api showFileType = false
    @api showFileSize = false
    @api showPreview = false
     wiredList = [];
    filesList = []
    columns = COLUMNS
    initialRecords;
    zip = ''
    count = false
    receivedData = []
    formattedData = []
    @wire(getRelatedFilesByRecordId,{recordId:'$recordId'})
    getAttachments(result){
        this.wiredList = result
        if(result.data){
            
            let parsedData = result.data;    
            parsedData = Object.assign({}, parsedData);  
            this.receivedData=Object.entries(parsedData);
            for (let index = 0; index < this.receivedData.length; index++) {
                this.receivedData[index] = this.receivedData[index][1];
            }
            this.receivedData.forEach(file=>{
            const test = this.formatBytes(file.ContentDocument.ContentSize, 2);
               let obj = {
                Title : file.Title,
                Size : test,
                FileType:file.FileType,
                ContentDocumentId:file.ContentDocumentId
               }
               this.formattedData.push(obj);
             })
             //console.log('formatted : '+JSON.stringify(this.receivedData) );
             this.receivedData = this.formattedData;
             this.initialRecords = this.receivedData;
             this.filesList = this.receivedData    
             
             if((this.filesList.length) > 0){
                 this.count = true
             }
        }
        if(result.error)
        {
            console.log(result.error);
        }
    }
    connectedCallback(){
        if(this.showFileType === true){
            this.columns = [...this.columns,{ label: 'File Type', fieldName:'FileType'}]
        }
        if(this.showFileSize === true){
            this.columns = [...this.columns,{ label: 'File Size', fieldName:'Size',type:'String'}]
        }
        if(this.showPreview === true){
            this.columns = [...this.columns,{ label:'Preview', type : 'button', typeAttributes:{
                label: 'view',  
                name: 'Preview',  
                variant: 'brand-outline',
                iconName: 'utility:preview',     
                iconPosition: 'right'
            }}]
        }
    }
    formatBytes(bytes,decimals){
        if(bytes === 0) return '0 Bytes';
        var k = 1024,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    handleRowAction(event){
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'Preview':
                this.previewFile(row);
                break;
            case 'Download':
                this.downloadFile(row);
                break;
            default:     
        }
    }
    previewFile(file){
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'filePreview'
            },
            state : {
                selectedRecordId: file.ContentDocumentId
            }
        });
    }
    downloadFile(file){
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `/sfc/servlet.shepherd/document/download/${file.ContentDocumentId}`
            }
        }, false 
    );
    }

    handleSearch( event ) {
        const searchKey = event.target.value.toLowerCase();
        //console.log( 'Search String is ' + searchKey );
        if ( searchKey ) {
            this.filesList = this.receivedData;            
            if ( this.filesList ) {
                let recs = [];
                for ( let rec of this.filesList ) {
                    let valuesArray = Object.values( rec );                    
                    for ( let val of valuesArray ) {
                        //console.log( 'val is ' + val );
                        let strVal = String( val );
                        if ( strVal ) {
                            if ( strVal.toLowerCase().includes( searchKey ) ) {
                                recs.push( rec );
                                break;
                            }
                        }
                    }  
                }
                this.filesList = recs;
             } 
        }  else {
            this.filesList = this.initialRecords;
        }        
    }

      
    checkboxHandler(){
        var rows = this.template.querySelector("lightning-datatable").getSelectedRows(); 
        var rowArray = Array.from(rows)
        rowArray.forEach(item=>{
            this.zip += '/'+ item.ContentDocumentId ;        
        })
        if(this.zip.length === 0){
            const event = new ShowToastEvent({
                title: 'Error',
                message:'Please select atleast one file!',
                variant: 'error'
            });
            this.dispatchEvent(event);
        }
        else{
            this.getZip();  
        }   
    }
    getZip(){
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `/sfc/servlet.shepherd/document/download/${this.zip}`
            }
        }, false 
    );
    setTimeout(()=>{this.showToast()},3000)
    this.zip = ''
    }
    showToast(){
        const event = new ShowToastEvent({
            title: 'Success',
            message:'Files downloaded successfully!!',
            variant: 'success'
        });
        this.dispatchEvent(event);  
    }
    refreshHandler(){
        window.location.reload();   
    }
    handleUploadFinished(event){
        const uploadedFiles = event.detail.files.length;
        const evt = new ShowToastEvent({
            title: 'SUCCESS',
            message: uploadedFiles + ' File(s) uploaded  successfully',
            variant: 'success',
        });
        this.dispatchEvent(evt);
        window.location.reload();
    }   
}