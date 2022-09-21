import { api, LightningElement, track, wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import {ShowToastEvent} from'lightning/platformShowToastEvent';
import getRelatedFilesByRecordId from '@salesforce/apex/fileDownloadDatatableController.getRelatedFilesByRecordId'
const COLUMNS = [
    { label: 'File Name', fieldName : 'Title'},
    { label: 'File Type', fieldName:'FileType'},
    { label: 'File Size', fieldName:'Size'},
    { label:'Preview', type : 'button', typeAttributes:{
        label: 'view',  
        name: 'Preview',  
        variant: 'brand-outline',
        iconName: 'utility:preview',     
        iconPosition: 'right'
    }},
    { label:'Download', type : 'button', typeAttributes:{
        label: 'Download',  
        name: 'Download',  
        variant: 'brand',
        iconName: 'action:download',     
        iconPosition: 'right'
    }}
]
export default class FileDownloadFeatureDataTable extends NavigationMixin(LightningElement) {
    @api recordId
    @track filesList
    filesList = []
    columns = COLUMNS
    zip = ''
    connectedCallback() {
        this.handleSync();
    }
    handleSync(){
        getRelatedFilesByRecordId({
            recordId : this.recordId
        }).then(result => {
            let parsedData = JSON.parse(result);
            let stringifiedData = JSON.stringify(parsedData);
            let finalData = JSON.parse(stringifiedData);     
            finalData.forEach(file=>{
               file.Size = this.formatBytes(file.ContentDocument.ContentSize, 2);               
            })
            this.filesList = finalData     
        })
    }
    formatBytes(bytes,decimals){
        if(bytes == 0) return '0 Bytes';
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
    checkboxHandler(){
        var rows = this.template.querySelector("lightning-datatable").getSelectedRows(); 
        var rowArray = Array.from(rows)
        rowArray.forEach(item=>{
            this.zip += '/'+ item.ContentDocumentId ;        
        })
        if(this.zip.length == 0){
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
    this.showToast();
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
}