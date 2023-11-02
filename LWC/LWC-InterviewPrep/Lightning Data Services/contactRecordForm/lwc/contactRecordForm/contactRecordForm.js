import { LightningElement,api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
export default class ContactRecordForm extends LightningElement {
    @api recordId;
    fields = [NAME_FIELD];
}