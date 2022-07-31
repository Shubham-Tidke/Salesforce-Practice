import { api, LightningElement } from 'lwc';
import {ShowToastEvent} from'lightning/platformShowToastEvent'
export default class RecordAndObjectFetching extends LightningElement {
    @api recordId;
    @api objectApiName;

    showToastMsg(){
        this.showToast("Great!!","Success Toast","success")
    }
    showToastMsg2(){
        this.showToast("Oops!!","Error Toast","error")
    }
    showToast(title,message,variant){
        this.dispatchEvent(ShowToastEvent({
            title,
            message,
            variant
        }))
    }
}