import { LightningElement } from 'lwc';
import getResponse from '@salesforce/apex/ComponentCommunicationHandler.getResponse';
export default class SampleParentComponent extends LightningElement {
    parentComponentMsg = 'Sample text from parent component';
    apiResponse;
    dataDetails = [
        {
            "id": 1,
            "name": "cerulean",
            "year": 2000            
        },
        {
            "id": 2,
            "name": "fuchsia rose", 
            "year": 2001
        },
        {
            "id": 3, 
            "name": "true red", 
            "year": 2002
        }, 
        {
            "id": 4, 
            "name": "aqua sky",
            "year": 2003
        },
        { 
            "id": 5,
            "name": "aqua ",
            "year": 2004
        },
        {  
            "id": 6, 
            "name": "blue turquoise", 
            "year": 2005
        }
    ]
    handleBtnClick(){
        getResponse({}).then(result=>{
            console.log(JSON.parse(result).count);
            this.apiResponse = JSON.stringify(result);
            console.log('OUTPUT : ',this.apiResponse);
        })
    }
    handleBackgroundChangeClick(){
       this.template.querySelector('c-sample-child-component-four').changeBackground();
    }
}