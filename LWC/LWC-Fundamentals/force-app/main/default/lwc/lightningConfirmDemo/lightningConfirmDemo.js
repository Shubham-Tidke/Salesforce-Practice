/* eslint-disable no-restricted-globals */
import { LightningElement } from 'lwc';
import LightningConfirm from 'lightning/confirm';
export default class LightningConfirmDemo extends LightningElement {
    async  confirmHandler(){
      const result = await LightningConfirm.open({
            message:"Are you sure?",
            label:"Confirm Refresh",
            theme: "error"
        })
        if(result){
            location.reload();
        }
    }
}