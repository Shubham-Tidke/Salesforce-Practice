import { LightningElement, wire } from 'lwc';
import fetchAllTriggers from '@salesforce/apex/automationHandler.fetchAllTriggers';
import fetchMdtRecords from '@salesforce/apex/automationHandler.fetchMdtRecords';
export default class AutomationHandler extends LightningElement {

    triggerData;
    items = []
    mdt_records = [];
    @wire(fetchAllTriggers)
    wiredData({ error, data }) {
      if (data) {
        console.log('Data', JSON.stringify(data));
        this.triggerData = data;
        for (let index in this.triggerData) {
           this.items = [...this.items, { Object: index, TriggerName: this.triggerData[index] }];
        }     
      } else if (error) {
        console.error('Error:', error);
      }
    }   
    @wire(fetchMdtRecords)
    wiredMetaData({ error, data }) {
      if (data) {
        console.log('Data', data);
      } else if (error) {
        console.error('Error:', error);
      }
    }
    
    toggleHandler(event){
      let tgrName = this.template.querySelector('div');
      console.log(tgrName);
    }
}