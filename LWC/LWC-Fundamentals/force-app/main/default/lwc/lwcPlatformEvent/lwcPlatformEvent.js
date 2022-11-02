/* eslint-disable no-unused-vars */
import { api, LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled }  from 'lightning/empApi';
export default class LwcPlatformEvent extends LightningElement {

    subscription = {};
    @api channelName = '/event/User_Message__e';
    
    connectedCallback(){
        this.registerErrorListener();
        this.handleSubscribe();
    }

    handleSubscribe(){
            // Callback invoked whenever a new event message is received
            const thisReference = this;
            const messageCallback = function(response) {
                console.log('New message received 1: ', JSON.stringify(response));
                console.log('New message received 2: ', response);
                
                let obj = JSON.parse(JSON.stringify(response));
                console.log('New message received 4: ', obj.data.payload.Message__c);
                console.log('New message received 5: ', this.channelName);
                const evt = new ShowToastEvent({
                    title: 'Congrats!!',
                    message: obj.data.payload.Message__c,
                    variant: 'success',
                });
    
                thisReference.dispatchEvent(evt);
                // Response contains the payload of the new message received
            };
    
            // Invoke subscribe method of empApi. Pass reference to messageCallback
            subscribe(this.channelName, -1, messageCallback).then(response => {
                // Response contains the subscription information on subscribe call
                console.log('Subscription request sent to: ', JSON.stringify(response.channel));
                this.subscription = response;
            });
    }
    registerErrorListener(){
        onError(error=>{
            console.log("ERROR : "+JSON.stringify(error));
        })
    }
}