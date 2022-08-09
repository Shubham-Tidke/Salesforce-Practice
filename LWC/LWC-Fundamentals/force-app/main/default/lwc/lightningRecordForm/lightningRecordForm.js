
import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import NAME_FIELD from '@salesforce/schema/Account.Name'
import ANNUAL_REVENUE from '@salesforce/schema/Account.AnnualRevenue'
import TYPE_FIELD from '@salesforce/schema/Account.Type'
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'

export default class LightningRecordForm extends LightningElement {
    objectName = ACCOUNT_OBJECT
    fieldList =[NAME_FIELD,TYPE_FIELD,ANNUAL_REVENUE,INDUSTRY_FIELD]
    @api recordId

    successHandler(event){
        console.log(event.detail.id);
        this.recordId = event.detail.id
        this.dispatchEvent(new ShowToastEvent({
            title:"Account Created",
            message:"record ID "+ event.detail.id,
            variant: "success"
            })
        )
    }
}