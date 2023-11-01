import { LightningElement } from 'lwc';
import getResponse from '@salesforce/apex/ComponentCommunicationHandler.getResponse';
export default class SampleParentComponent extends LightningElement {
    parentComponentMsg = 'Sample text from parent component';
    apiResponse;
    inputString;
    btnClicked = false;
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
        this.btnClicked = true;
        getResponse({}).then(result=>{
            console.log(JSON.parse(JSON.stringify(result)));
            this.apiResponse =(JSON.parse(result));
            this.apiResponse = this.apiResponse.categories;
            //console.log('OUTPUT : ',this.apiResponse.categories);
        })
    }
    handleBackgroundChangeClick(){
       this.template.querySelector('c-sample-child-component-four').changeBackground();
    }
    handleInput(event){
        console.log('OUTPUT : ',event.target.value);
        this.inputString = event.target.value;
    }
    handleClose(event){
        console.log('OUTPUT : ',event.detail.message);
        this.btnClicked = event.detail.message;
    }
}