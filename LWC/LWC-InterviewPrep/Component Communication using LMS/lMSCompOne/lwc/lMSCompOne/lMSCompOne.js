import { LightningElement,wire } from 'lwc';
import msgChannel from '@salesforce/messageChannel/demo__c';
import {publish,MessageContext} from 'lightning/messageService';
/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_salesforce_modules */
export default class LMSCompOne extends LightningElement {
    inputMsg;

    @wire(MessageContext)
    messageContext;

    handleInput(event){
        this.inputMsg = {msg:event.target.value};

    }
    handleClick(){
        publish(this.messageContext,msgChannel,this.inputMsg);
    }
}