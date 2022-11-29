import { LightningElement, wire } from 'lwc';
import getAllObjects from '@salesforce/apex/AppController.getAllObjects';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class App extends LightningElement {

    objValue;
    fieldValue;  
    queryTypeValue;
    aggrFunc;
    aggrField; 
    additionalFields=[];
    objOptions = [];
    fieldsOptions = [];
    showFields = false;
    objectsSelected = false;
    showButton = false;
    showQuery = false;
    showAggrFunc = false;
    isValueInQueryType = false;
    showAggrFields = false;
    finalQuery = '';
    limitValue = '';
    


    get queryTypeOptions() {
        return [
            {label:"Normal Query", value:"Normal Query"},
            {label:"Aggregate Query", value:"Aggregate Query"}
        ];
    }

    get aggrFuncOptions() {
        return [
            {label:"Count", value:"COUNT"},
            {label:"Average", value:"AVG"},
            {label:"Minimum", value:"MIN"},
            {label:"Maximum", value:"MAX"},
            {label:"Sum", value:"SUM"},
            {label:"Count Distinct", value:"COUNT_DISTINCT"}
        ];
    }

    @wire(getAllObjects)
    wiredData({ error, data }) {
      if (data) {
        //console.log('Data', data);
        data.map(item => {
            this.objOptions = [...this.objOptions,{label: item.SobjectType, value: item.SobjectType}];
        })
        //console.log('Option is:', this.options);
      } else if (error) {
        console.error('Error:', error);
      }
    }

    @wire(getObjectInfo, { objectApiName: '$objValue' })
    wiredFieldsData({ error, data }) {
      if (data) {
        this.fieldValue = '';
        //console.log('Field Value:', this.fieldValue);
        for(let i in data.fields){
            //console.log('Item is :' + JSON.stringify(data.fields[i]));
            this.fieldsOptions = [...this.fieldsOptions, {label: data.fields[i].label, value: data.fields[i].apiName}]
        }
      //  console.log('Field Options is :' + JSON.stringify(this.fieldsOptions));
      } else if (error) {
         console.error('Error:', error);
      }
    }

    handleObjectChange(event){ 
        this.objValue = event.target.value;
        this.fieldValue = '';
        this.finalQuery = '';
        // console.log('Value selected is:'+ this.objValue);
        // console.log('FieldValue selected is:'+ this.fieldValue);
        this.showFields = true;
        this.fieldsOptions = [];
    }

    handleQueryTypeChange(event){
        this.isValueInQueryType = true;
        this.fieldValue = '';
        this.finalQuery = '';
        this.limitValue='';
        this.showQuery = false;
        this.showButton = false;
        this.queryTypeValue = event.target.value;
        this.showAggrFunc = this.queryTypeValue === 'Normal Query' ? false : true;
    }

    handleAggrChange(event){
        this.showAggrFields = true;
        this.aggrFunc = event.target.value;
    }

    handleAggrFieldChange(event){
        this.aggrField = event.target.value;
        this.showButton = this.aggrField != '' ? true : false; 
        this.finalQuery = '';
    }

    handleAdditionalFieldChange(event){
        this.additionalFields = event.target.value; 
        this.finalQuery = '';
    }

    handleFieldChange(event){
        this.fieldValue = event.target.value;
        //console.log('Value selected is:'+ this.fieldValue);
        this.showButton = this.fieldValue!= '' ? true : false;
    }

    handleLimitChange(event){
        this.limitValue = event.target.value;
        var inputCmp = this.template.querySelector('.limitInput');
        if(inputCmp.value >= 50000){
            inputCmp.setCustomValidity('Value is against the governor limit');
            inputCmp.reportValidity();
        }else{
            inputCmp.setCustomValidity('');
            inputCmp.reportValidity();
        }
    }

    handleClick(){
        this.showQuery = true;
        if(this.queryTypeValue === 'Normal Query'){
            this.finalQuery = 'SELECT '+this.fieldValue+ ' FROM '+this.objValue;
        }
        else{
            if(this.aggrFunc){
                this.finalQuery = 'SELECT '+this.aggrFunc;
            }
            if(this.aggrField ){
                this.finalQuery += '('+ this.aggrField + ')';
            }else if(this.aggrFunc === 'COUNT'){
                 this.finalQuery += '()';
            }
            if(this.additionalFields.length > 0 ){ 
                this.finalQuery += ' ,'+ this.additionalFields +' FROM ' + this.objValue+' GROUP BY '+ this.additionalFields;
            }else{
                this.finalQuery += ' FROM ' + this.objValue;
            }                      
        }    
        if(this.limitValue && this.limitValue !== '0'){
            this.finalQuery += ' LIMIT '+ this.limitValue;
        }
    }   
}