import { LightningElement } from 'lwc';

export default class LifecycleParent extends LightningElement {
    connectedCallback(){
        //this method can be used to fetch data from server/loading the component
        console.log("connected callback from parent!");
    }
    constructor(){
        super();//constructor needs to call super
        //here only this.template can be accessed as the DOM is not yet ready to access till this stage
        console.log('Parent hook constructor');
    }
    renderedCallback(){
        console.log('Parent rendered callback');
    }
}