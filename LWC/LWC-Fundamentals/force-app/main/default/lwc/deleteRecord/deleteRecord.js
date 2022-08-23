import { LightningElement } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DeleteRecord extends LightningElement {
    recordId
    changeHandler(event){
        this.recordId = event.target.value
    }
    deleteHandler(){
        deleteRecord(this.recordId).then((result)=>{
            console.log('deleted');
            this.dispatchEvent(new ShowToastEvent({
                title : 'Success!!',
                message: 'Record deleted!!',
                variant: 'success'
            }))
            this.template.querySelector('form').reset()
        }).catch((error)=>{
            console.error(error);
        })
    }
}