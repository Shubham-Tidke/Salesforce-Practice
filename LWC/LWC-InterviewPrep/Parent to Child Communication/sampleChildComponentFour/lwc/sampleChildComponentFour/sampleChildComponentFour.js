import { LightningElement,api } from 'lwc';
export default class SampleChildComponentFour extends LightningElement {
    className = 'background-grey';
    @api changeBackground(){
        this.className = 'background-blue';
    }
}