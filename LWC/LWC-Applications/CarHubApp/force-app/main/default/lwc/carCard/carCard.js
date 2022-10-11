import { api, LightningElement, wire } from 'lwc';
import NAMEFIELD from '@salesforce/schema/Car__c.Name'
import PICTURE_URL_FIELD from '@salesforce/schema/Car__c.Picture_URL__c'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c'
import FUEL_FIELD from '@salesforce/schema/Car__c.Fuel__c'
import SEATS_FIELD from '@salesforce/schema/Car__c.Number_of_Seats__c'
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c'
import { getFieldValue } from 'lightning/uiRecordApi';
import CARS_SELECTED_MESSAGE from '@salesforce/messageChannel/carSelected__c'
import { subscribe,MessageContext,unsubscribe } from 'lightning/messageService';

export default class CarCard extends LightningElement {
    
    categoryField = CATEGORY_FIELD
    makeField = MAKE_FIELD
    msrpField = MSRP_FIELD
    fuelField = FUEL_FIELD
    seatsField = SEATS_FIELD
    controlField = CONTROL_FIELD
    recordId 
    carName
    carImage
    carSelectedSubscription
    handleLoadedRecord(event){
        const {records} = event.detail
        const recordData = records[this.recordId]
        this.carName = getFieldValue(recordData,NAMEFIELD)
        this.carImage = getFieldValue(recordData,PICTURE_URL_FIELD)
    }
    @wire(MessageContext)
    messageContext

    connectedCallback(){
        this.subscribeHandler();
    }
    subscribeHandler(){
        this.carSelectedSubscription =  subscribe(this.messageContext,CARS_SELECTED_MESSAGE,(message)=>{
               this.handleCarSelected(message)
           })
    }
    handleCarSelected(message){
        this.recordId = message.carId
    }
    disconnectedCallback(){
        unsubscribe(this.carSelectedSubscription)
        this.carSelectedSubscription = null
    }
}