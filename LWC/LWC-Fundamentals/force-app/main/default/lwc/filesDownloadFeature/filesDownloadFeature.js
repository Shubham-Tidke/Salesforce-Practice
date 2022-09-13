import { api, LightningElement, wire } from 'lwc';
import { getRelatedListCount } from 'lightning/uiRelatedListApi';
import {NavigationMixin} from 'lightning/navigation'
import getRelatedFilesByRecordId from '@salesforce/apex/fileDownloadController.getRelatedFilesByRecordId'
export default class FilesDownloadFeature extends NavigationMixin(LightningElement) {
    @api recordId
    totalFiles
    filesList = []
    @wire(getRelatedListCount,{
        parentRecordId: '$recordId',
        relatedListId:'CombinedAttachments'
    })
    countHandler({data,error}){
        if(data){
            this.totalFiles = data.count
          // console.log(JSON.stringify(data));
        }
        if(error){
            console.log(JSON.stringify(error));
        }
    }
    @wire(getRelatedFilesByRecordId,{recordId:'$recordId'})
    wireResult({data,error}){
        if(data){
                console.log(data);
              this.filesList = Object.keys(data).map(item=>({
                "label":data[item],
                "value":item,
                "url":`/sfc/servlet.shepherd/document/download/${item}`
            }))
            //console.log(this.filesList);
        }
        if(error){
            console.log(error);
        }
    }
    previewHandler(event){
        this[NavigationMixin.Navigate]({
            type:'standard__namedPage',
            attributes:{
                pageName:'filePreview'
            },
            state:{
                selectedRecordId:event.target.dataset.id
            }
        })
        console.log(event.target.dataset.id);
    }
}