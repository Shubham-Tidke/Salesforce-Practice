import { api, LightningElement, wire } from 'lwc';
import getSimilarCars from '@salesforce/apex/CarController.getSimilarCars'
import { getRecord } from 'lightning/uiRecordApi';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
import { NavigationMixin }from 'lightning/navigation'
export default class SimilarCars extends NavigationMixin(LightningElement) {
    @api recordId
    @api objectApiName
    similarCar
    @wire(getRecord,{recordId:'$recordId',fields:[MAKE_FIELD]})
    car

    fetchSimilarCars(){
        getSimilarCars({
            carId:this.recordId,
            makeType:this.car.data.fields.Make__c.value
        }).then(result=>{
            this.similarCar = result
            console.log(this.similarCar);
        }).catch(error=>{
            console.log(error);
        })
    }
    handleViewDetails(event){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId : event.target.dataset.id,
                objectApiName : this.objectApiName,
                actionName:'view'
            }
        })
    }
}