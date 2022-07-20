import { LightningElement } from 'lwc';

export default class CustomEventParent extends LightningElement {
    showModal = false;
     msg;
    clickHandler(){
        this.showModal = true;
    }
    closeHandler(event){
        this.showModal=false;
         this.msg = event.detail;
    }
}