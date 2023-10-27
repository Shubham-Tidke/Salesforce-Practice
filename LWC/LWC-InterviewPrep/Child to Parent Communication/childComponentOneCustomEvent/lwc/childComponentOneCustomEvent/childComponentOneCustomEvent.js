import { LightningElement,api } from 'lwc';
export default class ChildComponentOneCustomEvent extends LightningElement {
    @api childMsg = 'THIS IS CHILD COMPONENT DATA.';
    handleChildClick(){
        this.dispatchEvent(new CustomEvent('event'));
    }
}