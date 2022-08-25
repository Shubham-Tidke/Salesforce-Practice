import { LightningElement } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList'
export default class ApexImperative extends LightningElement {

    accounts
    handleClick(){
        getAccountList().then((result)=>{
            this.accounts = result
            console.log(result);
        }).catch((error)=>{
            console.log(error);
        })
    }
}