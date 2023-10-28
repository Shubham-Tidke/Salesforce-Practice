import { LightningElement,api } from 'lwc';
export default class ChildComponentTwoCustomEvent extends LightningElement {
    @api recordList;
    
    accClick(event){
        console.log('OUTPUT  : ',event.currentTarget.dataset.id);
        this.dispatchEvent(new CustomEvent('accountclick',{
            detail: event.currentTarget.dataset.id
        }))
    }
}