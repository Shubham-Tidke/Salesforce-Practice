import { LightningElement, wire } from 'lwc';
import { getPicklistValues,getObjectInfo } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'

export default class CarFilter extends LightningElement {
    filters ={
        searchKey : '',
        maxPrice :999999
    }

    @wire(getObjectInfo,{objectApiName: CAR_OBJECT})
    carObjectInfo

    @wire(getPicklistValues,{recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',fieldApiName:CATEGORY_FIELD})
    categories

    @wire(getPicklistValues,{recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',fieldApiName:MAKE_FIELD})
    makeType

    handleSearchKeyChnage(event){
        console.log(event.target.value);
        this.filters= {...this.filters,"searchKey": event.target.value} 
    }
    handleMaxPriceChange(event){
        console.log(event.target.value);
        this.filters= {...this.filters,"maxPrice": event.target.value}
    }
    handleCheckbox(event){
        const{name,value} = event.target.dataset
        console.log("name",name);
        console.log("value",value);
    }
}