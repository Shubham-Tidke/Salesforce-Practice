import { LightningElement, wire } from 'lwc';
import filterAccounts from '@salesforce/apex/AccountController.filterAccounts'

export default class ApexWireWithParams extends LightningElement {
    selectedType=''
    
    @wire(filterAccounts,{type:'$selectedType'})
    filteredAccounts
    get typeOptions(){
         return[
            {label:'Customer - Direct',value:'Customer - Direct'},
            {label:'Customer - Channel',value:'Customer - Channel'},
            {label:'Technology Partner',value:'Technology Partner'},
         ]
    }
    handleChange(event) {
        this.selectedType = event.detail.value;
    }
}