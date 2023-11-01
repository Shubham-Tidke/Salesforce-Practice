import { LightningElement } from 'lwc';
export default class LifecycleHookParent extends LightningElement {
    constructor(){
         super();
        console.log('Parent constructor');
    }
    connectedCallback() {
        console.log('Parent connected callback');
    }
    renderedCallback(){
        console.log('Parent rendered callback');
    }
    disconnectedCallback() {
        console.log('Parent disconnected callback');
    }
    errorCallback(error, stack) {
        console.log('Parent error callback');
    }
}