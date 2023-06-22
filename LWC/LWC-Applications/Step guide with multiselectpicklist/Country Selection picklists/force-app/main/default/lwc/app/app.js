import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import REGION_FIELD from '@salesforce/schema/Account.Region_Picklist__c';
//import COUNTRY_FIELD from '@salesforce/schema/Account.Country_Picklist__c';
//import STATE_FIELD from '@salesforce/schema/Account.State_Picklist__c';
import INDUSTRY_VERTICAL_FIELD from '@salesforce/schema/Account.Industry_Vertical__c';
import LANGUAGE_FIELD from '@salesforce/schema/Account.Languages__c';
//import PARTNER_LEVEL_FIELD from '@salesforce/schema/Account.Partner__c';
import PARTNER_TYPE_FIELD from '@salesforce/schema/Account.Partner_type__c';
import getSearchedAccounts from '@salesforce/apex/SearchAccountController.getSearchedAccounts';

export default class App extends LightningElement {
    recordTypeId;
    showCountry = true;
    showStates = true;
    //showSearch = true;
    countryData;
    stateData;
    RegionOptions;
    CountryOptions;
    StateOptions;
    IndustryOptions;
    LanguageOptions
    PartnerLevelOptions;
    PartnerTypeOptions;
    selectedRegion;
    selectedCountry;
    selectedState;
    allIndustryValues = [];
    allLanguageValues = [];
    industryValue
    languageValue
    industryOptionsMaster
    languageOptionMaster
    showPartners = false
    firstPage = true;
    isYesSelected = false;
    isNoSelected = false;
    showFilters =false;
    filtersFrom;

    //need to change with metadata
    existingCustomerOptions=[
        {   
            Id:"1",
            Name:"Jumpstart"
        },
        {   
            Id:"2",
            Name:"Training"
        },
        {   
            Id:"3",
            Name:"Implement my Gurobi Product"
        },
        {   
            Id:"4",
            Name:"Model Validation"
        }
    ]
    
    //need to change with metadata
    nonExistingCustomerOptions = [
        {   
            Id:"1",
            Name:"Value Accelerator"
        },
        {   
            Id:"2",
            Name:"Identifying my optimization project"
        },
        {   
            Id:"3",
            Name:"Building my optimization application"
        }
    ]

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    getRecordTypeId({ data }) {
        if (data) {
            this.recordTypeId = data.defaultRecordTypeId
        }
    }
    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: REGION_FIELD })
    regionList({ data, error }) {
        if (data) {
            //console.log("Region Data : "+JSON.stringify(data));
            this.RegionOptions = data.values.map(item => ({ label: item.label, value: item.value }))
        } else {
            console.log(error);
        }
    }
    
    // @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: COUNTRY_FIELD })
    // countryList({ data, error }) {
    //     if (data) {
    //         //console.log("Country Data : "+JSON.stringify(data));
    //         this.countryData = data;
    //         //this.CountryOptions = data.values.map(item=>({ label: item.label, value: item.value }))           
    //     } else {
    //         console.log(error);
    //     }
    // }
    // @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: STATE_FIELD })
    // stateList({ data, error }) {
    //     if (data) {
    //         //console.log("State Data : "+JSON.stringify(data));
    //         this.stateData = data;
    //         //console.log("State picklist::"+this.StateOptions);
    //     } else {
    //         console.log(error);
    //     }
    // }
    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: LANGUAGE_FIELD })
    languageList({ data, error }) {
        if (data) {
            //console.log("Language Data : "+JSON.stringify(data));
            this.LanguageOptions = data.values.map(item => ({ label: item.label, value: item.value }))
            this.languageOptionMaster = this.LanguageOptions;
        } else {
            console.log(error);
        }
    }
    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: INDUSTRY_VERTICAL_FIELD })
    industryList({ data, error }) {
        if (data) {
            //console.log("Industry Data : "+JSON.stringify(data));
            this.IndustryOptions = data.values.map(item => ({ label: item.label, value: item.value }))
            this.industryOptionsMaster = this.IndustryOptions;
        } else {
            console.log(error);
        }
    }
    // @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: PARTNER_LEVEL_FIELD })
    // partnerLevelList({ data, error }) {
    //     if (data) {
    //         //console.log("Partner Level Data : "+JSON.stringify(data));
    //         this.PartnerLevelOptions = data.values.map(item => ({ label: item.label, value: item.value }))
    //     } else {
    //         console.log(error);
    //     }
    // }
    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: PARTNER_TYPE_FIELD })
    partnerTypeList({ data, error }) {
        if (data) {
            //console.log("Partner Level Data : "+JSON.stringify(data));
            this.PartnerTypeOptions = data.values.map(item => ({ label: item.label, value: item.value }))
        } else {
            console.log(error);
        }
    }
    handleYesClick(){
        this.firstPage = false;
        this.isYesSelected = true;
    }
    handleNoClick(){
        this.firstPage = false;
        this.isYesSelected = false;
        this.isNoSelected = true;
    }
    handleSet1Change(event){              
        console.log("Visual picker : "+ event.target.value);        
    }
    handleYesNextClick(){
        this.isYesSelected = false;
        this.showFilters = true;
        this.filtersFrom = 'Yes';
    }
    handleYesBackClick(){
        this.isYesSelected = false;
        this.showFilters = false;
        this.firstPage = true;
    }
    handleNoBackClick(){
        this.isYesSelected = false;
        this.isNoSelected = false;
        this.firstPage = true;
    }
    handleNoNextClick(){
        this.isYesSelected = false;
        this.isNoSelected = false;
        this.firstPage = false;
        this.showFilters = true;
        this.filtersFrom = 'No';
    }
    handleRegionChange(event) {
        // console.log('Region is: '+ event.detail.value);
        // console.log('COuntry Data is: '+ JSON.stringify(this.countryData));
        this.CountryOptions = [];
        this.showCountry = false;
        this.showStates = true;
       // this.showSearch = false;
        this.showPartners = false;        
        this.selectedRegion = event.detail.value;
        //const tempRegion = event.detail.value;
        //console.log(this.countryData.controllerValues[tempRegion]);
        // const countryIndex = this.countryData.controllerValues[tempRegion];
        // let newArray = this.countryData.values.filter(item => {
        //     //console.log('VAlid For is: '+ item.validFor);
        //     return (item.validFor == countryIndex);
        // });       
        // newArray.map(item => {
        //     this.CountryOptions = [...this.CountryOptions, { label: item.label, value: item.value }];
        // })

        

    }
    // handleCountryChange(event) {
    //    // console.log('State Data is: ' + JSON.stringify(this.stateData));
    //     this.StateOptions = [];
    //     this.showStates = false;
    //     this.showSearch = true;
    //     this.showPartners = false;
    //     const tempCountry = event.detail.value;
    //     this.selectedCountry = event.detail.value;
    //     //console.log(this.countryData.controllerValues[tempRegion]);
    //     const stateIndex = this.stateData.controllerValues[tempCountry];
    //     let newArray = this.stateData.values.filter(item => {
    //         //console.log('VAlid For is: '+ item.validFor);
    //         return (item.validFor == stateIndex);
    //     });

    //     //console.log('New Arr: ' + JSON.stringify(newArray));
    //     newArray.map(item => {
    //         this.StateOptions = [...this.StateOptions, { label: item.label, value: item.value }];
    //     })

    //     //console.log('State Options: ' + JSON.stringify(this.StateOptions));

    // }
    // handleStateChange(event) {
    //     this.showSearch = false;
    //     this.selectedState = event.detail.value;
    //     this.showPartners = false;
    //   //  console.log(event.detail.value);
    // }
    // handleIndustryChange(event) {
    //     console.log(event.detail.value);
    // }
    // handlePartnerLevelChange(event) {
    //     console.log(event.detail.value);
    // }
    handlePartnerTypeChange(event) {
        console.log(event.detail.value);
    }
    handleFilterBackClick(){
        this.allIndustryValues = []
        this.allLanguageValues = []
        this.showPartners = false;
        if(this.filtersFrom == 'Yes'){
            this.isYesSelected = true;
            this.showFilters = false;       
        }
        else{
            this.isNoSelected = true;
            this.showFilters = false;
        }
    }
    handleSearchClick() {
        console.log("Search clicked!!");
        getSearchedAccounts({ Region: this.selectedRegion, Country: this.selectedCountry, State: this.selectedState })
        .then(result => {
            console.log(result);
            this.showPartners = true;
        })
    }
    
    //multiselect industry picklist logic
    handleIndustryMultiSelectChange(event) {
        this.industryValue = event.target.value;
        if (!this.allIndustryValues.includes(this.industryValue))
            this.allIndustryValues.push(this.industryValue);
        this.modifyIndustryOptions();
    }
    handleIndustryRemove(event) {
        this.industryValue = '';
        const industryRemoved = event.target.name;
        this.allIndustryValues.splice(this.allIndustryValues.indexOf(industryRemoved), 1);
        this.modifyIndustryOptions();
    }
    modifyIndustryOptions() {
        this.IndustryOptions = this.industryOptionsMaster.filter(elem => {
            if (!this.allIndustryValues.includes(elem.industryValue))
                return elem;
        })
    }
    //MULTISELECT LANGUAGE PICKLIST LOGIC
    handleLanguageSelectChange(event){
        this.languageValue = event.detail.value;
        if(!this.allLanguageValues.includes(this.languageValue))
            this.allLanguageValues.push(this.languageValue);
        this.modifyLanguageOptions();
    }
    handleLanguageRemove(event){
        this.languageValue = '';
        const languageRemoved = event.target.name;
        this.allLanguageValues.splice(this.allLanguageValues.indexOf(languageRemoved),1);
        this.modifyLanguageOptions();
    }
    modifyLanguageOptions(){
        this.LanguageOptions = this.languageOptionMaster.filter(element =>{
            if(!this.allLanguageValues.includes(element.languageValue))
            return element;
        })
    }
}