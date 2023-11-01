import { LightningElement,api } from 'lwc';
export default class SampleChildComponentThree extends LightningElement {
    @api response;
    
    connectedCallback() {
        console.log('OUTPUT : api child');
    } 
    handleCloseClick(){
        this.dispatchEvent(new CustomEvent('close', {
            detail: {
                message: false
            }
            //bubbles: true,
            //composed: true
        }))
    }
}