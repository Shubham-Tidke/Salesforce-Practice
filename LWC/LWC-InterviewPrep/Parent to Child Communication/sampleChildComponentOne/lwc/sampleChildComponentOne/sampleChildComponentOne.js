import { LightningElement,api } from 'lwc';
export default class SampleChildComponentOne extends LightningElement {
    childComponentMsg = 'Sample Message from child component.';
    @api msgfromparent = 'abc';
}