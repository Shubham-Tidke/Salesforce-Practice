import { LightningElement } from 'lwc';
export default class LifecycleHookChild extends LightningElement {
     constructor(){
         super();
        console.log('child constructor');
    }
    connectedCallback() {
        console.log('child connected callback');
    }
    renderedCallback(){
        console.log('child rendered callback');
    }
    disconnectedCallback() {
        console.log('child disconnected callback');
    }
    errorCallback(error, stack) {
        console.log('child error callback');
    }
}