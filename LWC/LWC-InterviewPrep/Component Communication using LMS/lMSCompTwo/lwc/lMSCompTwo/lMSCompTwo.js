import { LightningElement,wire } from 'lwc';
import msgChannel from '@salesforce/messageChannel/demo__c';
import {subscribe,MessageContext} from 'lightning/messageService';
export default class LMSCompTwo extends LightningElement {
   
    @wire(MessageContext)
    messageContext;

    subscription = null;
    receivedMsg;
    connectedCallback() {
        this.handleSubscribe();
    }
    handleSubscribe(){
        if(this.subscription)
        return;
        this.subscription = subscribe(this.messageContext,msgChannel,(message)=>{
            this.receivedMsg = message.msg;
        })
    }

}