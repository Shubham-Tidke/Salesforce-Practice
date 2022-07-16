import { LightningElement } from 'lwc';

export default class LifecycleParent extends LightningElement {
    isChildVisible = false;
    connectedCallback(){
        //this method can be used to fetch data from server/loading the component
        console.log("connected callback from parent!");
    }
    constructor(){
        super();//constructor needs to call super
        //here only this.template can be accessed as the DOM is not yet ready to access till this stage
        console.log('Parent hook constructor');
    }
    //gets rendered on any change happened on template
    renderedCallback(){
        console.log('Parent rendered callback');
    }
    handleShowChild(){
        this.isChildVisible = !this.isChildVisible;
    }
    //renders on catching any error from component
    errorCallback(error,stack){
        console.log(error);
        console.log(stack);
    }
}