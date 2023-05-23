import { LightningElement, wire } from 'lwc';
import getObjects from "@salesforce/apex/DatatableFrameworkController.getObjects";
import getFields from "@salesforce/apex/DatatableFrameworkController.getFields";
import getRecordsData from "@salesforce/apex/DatatableFrameworkController.getRecordsData";
import LightningAlert from 'lightning/alert';

const COLUMNS = []
export default class DatatableFramework extends LightningElement {
    objOptions = [];
    hasOptionsData = false;
    hasObjectFields = false;
    selectedObj;
    fieldOptions = []
    columns = COLUMNS
    selectedOptions = []
    dataList = [];
    showDataTable = false;
    @wire(getObjects, {})
    setOptions({ data, error }) {
        if (data) {
            //console.log(JSON.stringify(data));
            data.forEach(element => {
                //console.log(element.SobjectType);
                if (element.SobjectType.indexOf('__e') == -1) {
                    this.objOptions.push({
                        label: element.SobjectType,
                        value: element.SobjectType
                    })
                }
            });
            this.hasOptionsData = true
        }
        //console.log('OPYIONSS:'+JSON.stringify(this.options));  
    }
    get options() {
        return this.objOptions;
    }
    handleObjectChange(event) {
        this.showDataTable = false
        console.log("OBJ: " + event.detail.value);
        this.fieldOptions = []
        this.hasObjectFields = false;
        this.selectedOptions = []
        this.selectedObj = event.detail.value;
        getFields({ obj: event.detail.value }).then((result) => {
            //console.log(result);
            result.forEach(field => {
                //console.log(field.QualifiedApiName);
                this.fieldOptions.push({
                    label: field.QualifiedApiName,
                    value: field.QualifiedApiName
                })
            })
            this.hasObjectFields = true;
        })
    }
    handleFieldsChange(event) {
        this.columns = []
        this.showDataTable = false
        console.log('columnss: ' + event.detail.value);
        this.selectedOptions = event.detail.value;
        this.selectedOptions.forEach((field) => {
            this.columns.push({ label: field, fieldName: field, wrapText: true });
        })

    }
    handleButtonClick() {
        this.showDataTable = true;
        console.log("buttonclick: " + this.columns);
        if (this.columns.length > 0) {
            getRecordsData({ obj: this.selectedObj, fieldName: this.selectedOptions }).then((result) => {
                console.log("result: " + JSON.stringify(result));
                this.dataList = result;
            })
        } else {
            LightningAlert.open({
                message: 'Select Fields before generating the datatable!',
                label: 'Error',
                theme: "error" //warning ,error,success
            })
        }

    }
    connectedCallback() {

    }


}