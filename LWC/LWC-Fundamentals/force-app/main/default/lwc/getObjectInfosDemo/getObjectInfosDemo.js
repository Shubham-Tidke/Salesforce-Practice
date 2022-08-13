import { LightningElement,wire } from 'lwc';
import { getObjectInfos,getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity'
export default class GetObjectInfosDemo extends LightningElement {
    // @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJECT})
    // objectInfo

    objectApiNames = [ACCOUNT_OBJECT,OPPORTUNITY_OBJECT]
    objectInfos
    @wire(getObjectInfos,{objectApiNames:'$objectApiNames'})
    objectInfosHandler({data}){
        if(data){
            console.log(data);
            this.objectInfos = data
        }
        else{
            console.log("jyagujf");
        }
       
    }

}
