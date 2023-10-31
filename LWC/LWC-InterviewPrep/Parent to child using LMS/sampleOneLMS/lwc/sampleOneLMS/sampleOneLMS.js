import { LightningElement,wire } from 'lwc';
import SampleLMS from '@salesforce/messageChannel/SampleLMS__c';
import {publish,subscribe,MessageContext} from 'lightning/messageService';
export default class SampleOneLMS extends LightningElement {
    @wire(MessageContext)
    msgContext;
    inputVal;
    msg;
    handleInput(event){
        this.inputVal = {communication:event.target.value};
    }
    handlePublishClick(){
        this.handlePublish();
    }
    handlePublish(){
         console.log('OUTPUT : published');
        publish(this.msgContext,SampleLMS,this.inputVal);
    }
    connectedCallback() {
       
       // this.handleSubscribe();
    }
    handleSubscribe(){
        subscribe(this.msgContext,SampleLMS,(output)=>{
            this.msg = output.communication;
        })
    }
}