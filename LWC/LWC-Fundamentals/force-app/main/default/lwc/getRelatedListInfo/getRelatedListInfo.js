import { api, LightningElement, wire } from 'lwc';
import { getRelatedListInfo } from 'lightning/uiRelatedListApi';

export default class GetRelatedListInfo extends LightningElement {
    @api objectApiName;
    relatedData
    @wire(getRelatedListInfo,{
        parentObjectApiName:'$objectApiName',
        relatedListId:'Contacts'
    })relatedListInfoHandler({data,error}){
        if(data){
            //console.log(JSON.stringify(data));
            this.relatedData = data.displayColumns
        }
        if(error){
            console.log(JSON.stringify(error));
        }
    } 
}