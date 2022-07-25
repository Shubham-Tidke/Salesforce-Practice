import { LightningElement, wire } from 'lwc';
import SAMPLELMC from '@salesforce/messageChannel/sampleMsgChannel__c';
import { MessageContext , subscribe , unsubscribe ,APPLICATION_SCOPE} from 'lightning/messageService';
export default class LmsComponentB extends LightningElement {
    @wire(MessageContext)
    context
    receivedMessage
    subscription

    connectedCallback(){
        this.subscribeMsg();
    }
    subscribeMsg(){
       this.subscription = subscribe(this.context,SAMPLELMC,
            (message)=>{this.handleMessage(message)},
            {scope: APPLICATION_SCOPE} )
    }
    handleMessage(message){
        this.receivedMessage = message.lmsData.value ? message.lmsData.value :'No MSG';
    }
    unsubscribeMessage(){
        unsubscribe(this.subscription)
        this.subscription = null;
    }

}