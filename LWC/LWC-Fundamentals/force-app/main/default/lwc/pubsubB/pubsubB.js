import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';
export default class PubsubB extends LightningElement {

    receivedMessage;
    //as soon as component B loads,it needs to subscribe
    // the published event from A,hence subscribe written in connected callback
    connectedCallback(){
        this.callSubscriber();
    }
    callSubscriber(){
        //service component pubsub.js has subscribe method in it
        //which takes an event and a callback method
        pubsub.subscribe('componentA',(message)=>{
            this.receivedMessage = message;
        });
    }
}