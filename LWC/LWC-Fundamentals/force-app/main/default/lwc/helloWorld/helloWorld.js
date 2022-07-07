import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    name = "User";

    changeHandler(event){
        this.name = event.target.value;
    }
}