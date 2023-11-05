import { LightningElement,wire } from 'lwc';
import getContactRecords from '@salesforce/apex/ClientSidePaginationController.getContactRecords';
export default class ClientSidePagination extends LightningElement {
    contacts;
    visibleContacts
    @wire(getContactRecords)
    contactRecs({ error, data }) {
      if (data) {        
        this.contacts = data;
        console.log('Contact Data', this.contacts);
      } else if (error) {
        console.error('Error:', error);
      }
    }
    updateContactHanlder(event){
        console.log('OUTPUT RECS : ',JSON.stringify(event.detail.records));
        this.visibleContacts = [...event.detail.records];
    }
}