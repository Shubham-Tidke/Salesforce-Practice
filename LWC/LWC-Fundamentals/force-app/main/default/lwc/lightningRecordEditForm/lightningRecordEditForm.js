import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT from '@salesforce/schema/Contact'
import NAME from '@salesforce/schema/Contact.Name'
import PHONE from '@salesforce/schema/Contact.Phone'
import EMAIL from '@salesforce/schema/Contact.Email'

export default class LightningRecordEditForm extends LightningElement {
    objectName = CONTACT
    fields = {
        nameField: NAME,
        phoneField: PHONE,
        emailField: EMAIL
    }
    successHandler(){
        this.dispatchEvent(new ShowToastEvent({
            title : "Success",
            message: "Contact Created",
            variant: "success"
        }))
    }
}