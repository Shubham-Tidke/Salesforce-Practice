import { LightningElement, wire } from 'lwc';
import fetchAllTriggers from '@salesforce/apex/automationHandler.fetchAllTriggers';
export default class AutomationHandler extends LightningElement {

    triggerData;
    items = []
    
    @wire(fetchAllTriggers)
    wiredData({ error, data }) {
      if (data) {
        console.log('Data', JSON.stringify(data));
        this.triggerData = data;
        for (let index in this.triggerData) {
           this.items = [...this.items, { Object: index, TriggerName: this.triggerData[index] }];
        }
        console.log(this.keyList);
      } else if (error) {
        console.error('Error:', error);
      }
    }
    toggleHandler(){
        return true;
    }
    
}