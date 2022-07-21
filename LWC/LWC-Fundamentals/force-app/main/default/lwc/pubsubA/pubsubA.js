import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';
export default class PubsubA extends LightningElement {
    message;
    inputHandler(event){
        this.message = event.target.value;
    }
    //publishing through component A 
    //by providing event name and callback
    publishHandler(){
        pubsub.publish('componentA',this.message);
    }
}