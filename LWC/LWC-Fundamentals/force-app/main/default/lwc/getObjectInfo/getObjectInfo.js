import { LightningElement,wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class GetObjectInfo extends LightningElement {

    defaultRecordId
    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJECT})
    objInfo({data,error}){
        if(data){
            console.log(data);
            this.defaultRecordId = data.defaultRecordTypeId
        }
        if(error){
            console.error(error);
        }
    }
}