/* eslint-disable no-unused-vars */
import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert'
export default class LightningAlertDemo extends LightningElement {
    alertHandler(){
        LightningAlert.open({
            message:'Lightning Prompt',
            label:'Alert Header',
            theme:"success" //warning ,error
        })
    }
}