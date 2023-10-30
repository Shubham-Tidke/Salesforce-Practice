import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/ComponentCommunicationHandler.getAccounts';
import TestModal from 'c/childComponentThreeCustomEvent';
export default class ParentComponentCustomEvent extends LightningElement {
    accountRecs;
    msg = 'THIS IS FROM PARENT COMPONENT';
    selectedAccount = null;
    //selectedAccountRevenue = null
    modal = false;
    @wire(getAccounts)
    wiredData({ error, data }) {
      if (data) {
        console.log('Data', data);
        this.accountRecs = data;
      } else if (error) {
        console.error('Error:', error);
      }
    }    
    handleParentClick(){
        this.msg = 'THIS IS FROM PARENT COMPONENT';
    }
    handleEventClick(){
        this.msg = 'CHILD COMPONENT BUTTON CLICKED.'
    }
    getAccountDetails(event){
        this.accountRecs.forEach(item => {
            if(item.Id == event.detail){
                this.selectedAccount = item
            }
        });
        console.log('SELECTED event : ',event.detail);
        console.log('SELECTED ACCOUNT : ',this.selectedAccount.Name);
        console.log('SELECTED ACCOUNT : ',this.selectedAccount.AnnualRevenue);
    }
    handleModalOpenClick(){
      //this.modal = true;
      TestModal.open();
    }
}