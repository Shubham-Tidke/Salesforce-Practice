/* eslint-disable no-unused-vars */
/* eslint-disable @lwc/lwc/no-async-operation */
/* eslint-disable vars-on-top */
/* eslint-disable no-dupe-class-members */
import { api, LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
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
    @track wiredList = [];
    filesList = []
    columns = COLUMNS
    initialRecords;
    zip = ''
    count = false
    
    @wire(getRelatedFilesByRecordId,{recordId:'$recordId'})
    getAttachments(result){
        this.wiredList = result
        if(result.data){
            //Parsing List data to JSON Object
            console.log(result.data);
            let parsedData = JSON.parse(result.data);            
            parsedData.forEach(file=>{
                file.Size = this.formatBytes(file.ContentDocument.ContentSize, 2);               
             })
             this.initialRecords = JSON.parse(result.data);
             this.filesList = parsedData    
             if((this.filesList.length) > 0){
                 this.count = true
             }
        }
        if(result.error)
        {
            console.log(result.error);
        }
       // console.log("wire action");
    }
    connectedCallback(){
        if(this.showFileType === true){
            this.columns = [...this.columns,{ label: 'File Type', fieldName:'FileType'}]
        }
        if(this.showFileSize === true){
            this.columns = [...this.columns,{ label: 'File Size', fieldName:'Size'}]
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
       // console.log("connected Callback action");
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
        console.log( 'Search String is ' + searchKey );
        if ( searchKey ) {
            this.filesList = this.initialRecords;            
            if ( this.filesList ) {
                let recs = [];
                for ( let rec of this.filesList ) {
                    let valuesArray = Object.values( rec );                    
                    for ( let val of valuesArray ) {
                        console.log( 'val is ' + val );
                        let strVal = String( val );
                        if ( strVal ) {
                            if ( strVal.toLowerCase().includes( searchKey ) ) {
                                recs.push( rec );
                                break;
                            }
                        }
                    }  
                }
                recs.forEach(file=>{
                    file.Size = this.formatBytes(file.ContentDocument.ContentSize, 2);               
                 })
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
    refreshHandler(event){
        refreshApex(this.wiredList);
        //console.log("refresh");
    }
}