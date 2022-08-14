import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'
export default class GetPicklistValuesDemo extends LightningElement {

    //wire adapter to fetch recordTypeId of an object
    recordTypeId
    value = '';
    industryOptions=[]
    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJECT})
    getRecordTypeId({data}){
        if(data){
            this.recordTypeId = data.defaultRecordTypeId
        }
    }

    //making recordTypeId value reactive so that this will run only when recordTypeId is received from previous wire
    @wire(getPicklistValues,{recordTypeId:'$recordTypeId',fieldApiName:INDUSTRY_FIELD})
    industryList({data,error}){
        if (data) {
            console.log(data);
             this.industryOptions = [...this.generatePicklist(data)]
        }
        if (error) {
            console.error(error);
        }
    }
    //function to return picklist array in form of label and value
    generatePicklist(data){
        return data.values.map(item=>({ label: item.label, value: item.value }))
    }
    handleChange(event) {
        this.value = event.detail.value;
    }
}