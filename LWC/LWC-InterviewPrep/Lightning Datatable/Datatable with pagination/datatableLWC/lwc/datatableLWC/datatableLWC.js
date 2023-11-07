import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/DatatableLwcController.getAccounts';

const  COLUMNS = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'ID', fieldName: 'Id' }
]
export default class DatatableLWC extends LightningElement {
    accData = [];
    visibleData = [];
    columns = COLUMNS;
    @wire(getAccounts)
    accountData({ error, data }) {
      if (data) {
        console.log('Data', data);
        this.accData = data;
      } else if (error) {
        console.error('Error:', error);
      }
    }
    updateAccountHanlder(){
        console.log('OUTPUT : ',event.detail.records);
        this.visibleData = [...event.detail.records]
    }
}