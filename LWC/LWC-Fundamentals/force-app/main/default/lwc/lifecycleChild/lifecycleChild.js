import { LightningElement } from 'lwc';

export default class LifecycleChild extends LightningElement {
    connectedCallback(){
        //this method can be used to fetch data from server/loading the component
        console.log("connected callback from child!");
        throw new Error("error from  child component")
    }
    constructor(){
        super();//constructor needs to call super
        //here only this.template can be accessed as the DOM is not yet ready to access till this stage
        console.log('Child hook constructor');
    }
    //this method gets called when you change anything in the component
    renderedCallback(){
        console.log('Child rendered callback');
    }
   //gets called whenever component get dismounted from template
    disconnectedCallback(){
        alert("child component disconnected")
        console.log("component disconnected");
    }
}