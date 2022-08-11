import { LightningElement, wire } from 'lwc';
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
export default class WireService extends LightningElement {
    
    userId = Id
    userDetails
    //using getRecord Adapter with wire service to fetch user details
    //passing adapter(getRecords) and adapter configuration (Id and fields to be fetched)to wire service
    //storing the cached response from wire service to a function (userDetailHandler)
    @wire(getRecord,{recordId:Id,fields:['User.Name','User.Email']})
    userDetailHandler({data,error}){
        if(data){
            this.userDetails = data.fields
            console.log(this.userDetails);
        }
        if(error)
        console.error(error);
    }
}