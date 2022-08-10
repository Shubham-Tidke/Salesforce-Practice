import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT from '@salesforce/schema/Contact'
import NAME from '@salesforce/schema/Contact.Name'
import PHONE from '@salesforce/schema/Contact.Phone'
import EMAIL from '@salesforce/schema/Contact.Email'

export default class LightningRecordEditForm extends LightningElement {
    objectName = CONTACT
    recordId
    fields = {
        nameField: NAME,
        phoneField: PHONE,
        emailField: EMAIL
    }
    successHandler(event){
        console.log(event.detail.id);
        this.recordId = event.detail.id
        this.dispatchEvent(new ShowToastEvent({
            title : "Success",
            message: "Contact Created",
            variant: "success"
        }))
    }
    successHandler2(event){
        this.dispatchEvent(new ShowToastEvent({
            title : "Success",
            message: "Contact Updated",
            variant: "success"
        }))
    }
    resetHandler(){
        const inputs = this.template.querySelectorAll('lightning-input-field')
        if(inputs){
            Array.from(inputs).forEach(field => {
                field.reset();
            });
        }
    }
}