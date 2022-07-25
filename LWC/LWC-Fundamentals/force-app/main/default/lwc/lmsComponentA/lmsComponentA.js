import { LightningElement, wire } from 'lwc';
import SAMPLELMC from '@salesforce/messageChannel/sampleMsgChannel__c';
import { MessageContext , publish } from 'lightning/messageService';
export default class LmsComponentA extends LightningElement {

//wire service to MessageContext adapter return all LWC components which are using
//messaging service
   @wire(MessageContext)
   context
   inputValue;

   inputHandler(event){
    this.inputValue = event.target.value
   }
   publishMessage(){
    const message = {
        lmsData :{
            value:this.inputValue
        }
    }
    //publishing message with MessageContext,message channel and message
    publish(this.context,SAMPLELMC,message)
   }
}