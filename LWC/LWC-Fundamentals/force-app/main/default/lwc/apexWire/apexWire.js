import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList'
export default class ApexWire extends LightningElement {
    @wire(getAccountList)
    accounts
    accountList
    @wire(getAccountList)
    accountHandler({data,error}){
        if(data){
            this.accountList = data.map(item=>{
                let newType = item.Type === 'Customer - Direct'? 'Direct': item.Type === 'Customer - Channel'? 'Channel':item.Type
                return{...item,newType}
            })
            console.log(data);
        }
        if(error){
            console.error(error);
        }
    }
}