import { LightningElement } from 'lwc';
export default class ParentComponentCustomEvent extends LightningElement {
    msg = 'THIS IS FROM PARENT COMPONENT';
    handleParentClick(){
        this.msg = 'THIS IS FROM PARENT COMPONENT';
    }
    handleEventClick(){
        this.msg = 'CHILD COMPONENT BUTTON CLICKED.'
    }
}