import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { updateRecord } from 'lightning/uiRecordApi';
import CONTACT from '@salesforce/schema/Contact'
const COLS = [      //datatable columns
    { label:'Id',fieldName :'Id' },
    { label:'Name',fieldName :'Name' },
    { label:'Phone',fieldName :'Phone',editable:true},
    { label:'Email',fieldName :'Email',type:'email',editable:true }
]
export default class UpdateRecord extends LightningElement {

    contacts =[]
    columns = COLS
    draftValues=[]
    @wire(getListUi,{objectApiName:CONTACT,listViewApiName:'AllContacts'})
    listViewHandler({data,error}){
        if(data){
            console.log(data);
            this.contacts = data.records.records.map(item=>{
                return{
                    "Id":this.getValue(item,'Id') ,
                    "Name": this.getValue(item,'Name'),
                    "Phone": this.getValue(item,'Phone'),
                    "Email": this.getValue(item,'Email')
                }
            })
        }
        if(error){
            console.error(error);
        }
        
    }
    getValue(data,field){
        return data.fields[field].value
    }
    handleSave(event){
        console.log(JSON.stringify(event.detail.draftValues));
        //storing the updated draft values in form of fields
        const recordInputs = event.detail.draftValues.map(item=>{
            const fields = {...item}
            return {fields:fields}
        })
        //since we are updating multiple values
        const promises = recordInputs.map(recordInput =>{
            updateRecord(recordInput)
        })
        Promise.all(promises).then(()=>{
            console.log('Contact updated');
            this.draftValues = []
        }).catch(error =>{
            console.error(error);
        })
    }
}