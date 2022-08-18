import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import CONTACT from '@salesforce/schema/Contact'
export default class GetListUiDemo extends LightningElement {

    contacts = []
    //implementing pagination using pagetokens
    pageToken = null
    previousPageToken = null
    nextPageToken = null
    @wire(getListUi,{objectApiName:CONTACT,listViewApiName:'AllContacts',pageSize:10,pageToken:"$pageToken"})
    getList({data}){
        if(data){
            console.log(data);
            this.contacts = data.records.records
            this.previousPageToken = data.records.previousPageToken
            this.nextPageToken = data.records.nextPageToken
        }
    }
    handlePrevious(){
        this.pageToken = this.previousPageToken
    }
    handleNext(){
        this.pageToken = this.nextPageToken
    }
    previousToken(){
        return this.previousPageToken === 'null'
    }
}