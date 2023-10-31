import { LightningElement,wire } from 'lwc';
import SampleLMS from '@salesforce/messageChannel/SampleLMS__c';
import {subscribe,MessageContext} from 'lightning/messageService';
export default class SampleTwoLMS extends LightningElement {
    msg;
    @wire(MessageContext)
    msgContext;
    connectedCallback() {
        this.handleSubscribe();
    }
    handleSubscribe(){
        console.log('OUTPUT : in subscribe');
        subscribe(this.msgContext,SampleLMS,(output)=>{
            this.msg = output.communication;
        })
    }
}