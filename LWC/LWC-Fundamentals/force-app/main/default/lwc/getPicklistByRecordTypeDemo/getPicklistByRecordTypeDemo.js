import { LightningElement, wire } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
export default class GetPicklistByRecordTypeDemo extends LightningElement {

    ratingList
    typeList
    typeValue;
    ratingValue; 
    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJECT})
    objectInfo

    @wire(getPicklistValuesByRecordType,{recordTypeId:'$objectInfo.data.defaultRecordTypeId',objectApiName:ACCOUNT_OBJECT})
    picklistValues({data}){
        if(data){
            console.log(data);
            this.ratingList = this.generatePicklist(data.picklistFieldValues.Rating)
            this.typeList = this.generatePicklist(data.picklistFieldValues.Type)
        }
    }
    generatePicklist(data){
        return data.values.map(item =>({"label": item.label, "value": item.value}))
    }
    handleChange(event) {
        const{name,value} = event.target
        if(name === 'Type')
        this.typeValue = value;

        if(name === 'Rating')
        this.ratingValue = value;
    }
}