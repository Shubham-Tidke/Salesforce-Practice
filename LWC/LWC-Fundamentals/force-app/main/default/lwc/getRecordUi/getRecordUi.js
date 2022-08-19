import { api, LightningElement, wire } from 'lwc';
import { getRecordUi } from 'lightning/uiRecordApi';

export default class GetRecordUi extends LightningElement {

    formFields=[
        
        {"fieldName":"FirstName","label":"First Name"},
        {"fieldName":"LastName","label":"Last Name"},
        {"fieldName":"Phone","label":"Phone Number"}
    ]
    @api recordId
    @wire(getRecordUi,{recordIds:'$recordId',layoutTypes:'Full',modes:'Edit'})
    getData({data,error}){
        if(data){
            console.log(data);
            this.formFields = this.formFields.map(item =>{
                return { ...item,value:data.records[this.recordId].fields[item.fieldName].value}
            })
        }
        if(error){
            console.log(error);
        }
    }
}