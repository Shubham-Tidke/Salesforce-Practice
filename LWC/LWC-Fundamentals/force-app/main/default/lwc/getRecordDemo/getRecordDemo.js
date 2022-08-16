import { api, LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import NAME from '@salesforce/schema/Account.Name';
import OWNER from '@salesforce/schema/Account.Owner.Name';
import REVENUE from '@salesforce/schema/Account.AnnualRevenue';
export default class GetRecordDemo extends LightningElement {

    name
    owner
    revenue
    @api recordId
    // to fetch selected field of an object
    @wire(getRecord,{recordId: '$recordId' ,fields:[NAME,OWNER,REVENUE]})
    dataHandler({data}){
        if(data){
            console.log(data);
            this.name = data.fields.Name.value
            this.owner = data.fields.Owner.displayValue
            this.revenue = data.fields.AnnualRevenue.displayValue
        }
    }

    //to fetch all fields of an object
    @wire(getRecord,{recordId: '$recordId' ,layoutTypes:['Full'],modes:['View']})
    getFieldNames({data}){
        if (data) {
            console.log(data);
        }
    }
}