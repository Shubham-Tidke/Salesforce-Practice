import { LightningElement, wire } from 'lwc';
import Id from '@salesforce/user/Id';
import NAME from '@salesforce/schema/User.Name'
import EMAIL from '@salesforce/schema/User.Email'
import { getRecord } from 'lightning/uiRecordApi';
const FIELDS = [NAME,EMAIL]
export default class WireService extends LightningElement {
    
    userId = Id
    userDetails
    //using getRecord Adapter with wire service to fetch user details
    //passing adapter(getRecords) and adapter configuration (Id and fields to be fetched)to wire service
    //storing the cached response from wire service to a function (userDetailHandler)
    @wire(getRecord,{recordId:'$userId',fields:FIELDS})
    //fetching recordId is an asynchronuous call and if the userId fails to get data on time,it will throw error,
    // to avoid that error we use $ as wire supports reactive variables
    userDetailHandler({data,error}){
        if(data){
            this.userDetails = data.fields
            console.log(this.userDetails);
        }
        if(error)
        console.error(error);
    }
}