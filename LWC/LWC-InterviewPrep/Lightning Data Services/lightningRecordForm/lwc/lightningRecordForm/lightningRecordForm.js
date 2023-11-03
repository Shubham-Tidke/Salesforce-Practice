import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import CONTACT from '@salesforce/schema/Contact';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
export default class LightningRecordForm extends LightningElement {
    sObject = CONTACT;
    fields = [NAME_FIELD];
    id;
    handleFormSuccess(event){
        console.log('OUTPUT : ',event.detail.id);
       
        this.id = event.detail.id;
         this.dispatchEvent(new ShowToastEvent({
            title:"RECORD CREATED",
            message: "record ID "+ event.detail.id,
            variant:"success"
        }))
    }
}