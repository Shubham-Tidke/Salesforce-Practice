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
    sortBy;
    sortDirection;
    pageSizeOptions = [5, 10, 25, 50, 75, 100];
    totalRecords = 0; //Total no.of records
    pageSize; //No.of records to be displayed per page
    totalPages; //Total no.of pages
    pageNumber = 1; //Page number  
    recordsToDisplay = [];
    get bDisableFirst() {
        return this.pageNumber == 1;
    }

    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }
    @wire(getObjects, {})
    setOptions({ data, error }) {
        if (data) {            
            data.forEach(element => {                
                if (element.SobjectType.indexOf('__e') == -1) {
                    this.objOptions.push({
                        label: element.SobjectType,
                        value: element.SobjectType
                    })
                }
            });
            this.hasOptionsData = true
        }
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
            result.forEach(field => {
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
        this.selectedOptions = event.detail.value;
        this.selectedOptions.forEach((field) => {
            this.columns.push({ label: field, fieldName: field, wrapText: true, sortable: true, hideDefaultActions: true });
        })

    }
    handleButtonClick() {
        this.showDataTable = true;
        if (this.columns.length > 0) {
            getRecordsData({ obj: this.selectedObj, fieldName: this.selectedOptions }).then((result) => {
                this.dataList = result;
                this.totalRecords = result.length;
                this.pageSize = this.pageSizeOptions[0];
                this.paginationHelper();
            })
        } else {
            this.showDataTable = false;
            LightningAlert.open({
                message: 'Select Fields before generating the datatable!',
                label: 'Error',
                theme: "error" //warning ,error,success
            })
        }
    }
    paginationHelper() {
        this.recordsToDisplay = [];
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        // set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            console.log("in for loop");
            this.recordsToDisplay.push(this.dataList[i]);
        }
    }
    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }

    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }

    firstPage() {
        this.pageNumber = 1;
        this.paginationHelper();
    }

    lastPage() {
        this.pageNumber = this.totalPages;
        this.paginationHelper();
    }

    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper();
    }
    handleSort(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortTableData(event.detail.fieldName, event.detail.sortDirection)
    }
    sortTableData(fieldName, direction) {
        let parseData = JSON.parse(JSON.stringify(this.recordsToDisplay));
        let keyValue = (a) => {
            return a[fieldName];
        };
        let isReverse = direction === 'asc' ? 1 : -1;
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : '';
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });
        this.recordsToDisplay = parseData;
    }
    connectedCallback() {

    }


}