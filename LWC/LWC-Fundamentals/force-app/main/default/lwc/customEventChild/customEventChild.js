import { LightningElement } from 'lwc';

export default class CustomEventChild extends LightningElement {
    closeModalHandler(){
        const closeEvent = new CustomEvent('close',{
            detail:"data from child modal"
        })
        this.dispatchEvent(closeEvent);
    }
}