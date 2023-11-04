import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class NavigationsLWC extends NavigationMixin(LightningElement) {
    extURL= 'https://www.youtube.com/';
    recordId = "0015h00001Uy3wWAAR";
    handleURLNavigationClick(){
        this[NavigationMixin.Navigate]({
            "type":"standard__webPage",
            "attributes":{
                "url":this.extURL
            }
        })
    }
    handleRecordDetailClick(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes:{
                recordId: this.recordId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        })
    }
    handleRecordEditClick(){
       this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes:{
                recordId: this.recordId,
                objectApiName: 'Account',
                actionName: 'edit'
            }
        }) 
    }
    handleRecordCreateClick(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:{
                objectApiName: 'Account',
                actionName: 'new'
            }
        })
    }
    //recent list by default
    handleRecordListClick(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName: 'Account',
                actionName: 'list'
            }
        })
    }
}