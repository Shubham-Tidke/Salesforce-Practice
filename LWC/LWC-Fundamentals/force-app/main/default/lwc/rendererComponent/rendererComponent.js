import { LightningElement } from 'lwc';
import signin from './signin.html'
import signon from './signon.html'
import renderTemplate from './rendererComponent.html'

export default class RendererComponent extends LightningElement {

    selectedButton = '';
    render(){ 
     return this.selectedButton === 'sign-on'? signon : 
            this.selectedButton === 'sign-in'? signin :
            renderTemplate;  
    }
    handleClick(event){
        this.selectedButton = event.target.label;
    }
    handleReturn(event){
        this.selectedButton = event.target.label
    }
}