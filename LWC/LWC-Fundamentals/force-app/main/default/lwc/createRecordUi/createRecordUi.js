import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import {showToastEvent} from 'lightning/platformShowToastEvent'
export default class CreateRecordUi extends LightningElement {
    formFields={}
    changeHandler(event){
        const{name,value} = event.target //destructuring event
        this.formFields[name] = value
    }
    createContact(){
        const recordInput = {apiName:CONTACT_OBJECT,fields:this.formFields}
        createRecord(recordInput).then(result=>{
            this.showToast('Success','Contact Created');
            this.template.querySelector('form.createForm').reset()
            this.formFields={}
        }).catch(error=>{
            this.showToast('Error',error.body.message,'error');
        })
    }
    showToast(title,message,variant){
        this.dispatchEvent(new showToastEvent({
            title,
            message,
            variant: variant||'success'
        }))
    }
}