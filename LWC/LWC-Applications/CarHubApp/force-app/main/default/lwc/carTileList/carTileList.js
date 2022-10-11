import { LightningElement, wire } from 'lwc';
import getCars from '@salesforce/apex/CarController.getCars'
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/carsFiltered__c'
import CARS_SELECTED_MESSAGE from '@salesforce/messageChannel/carSelected__c'

import {publish, subscribe,MessageContext,unsubscribe } from 'lightning/messageService';

export default class CarTileList extends LightningElement {
    cars
    error
    filters = {};
    carFilterSubscription
    @wire(getCars,{filters:'$filters'})
    carsHandler({data,error}){
        if(data){
            //console.log(data);
            this.cars = data
        }
        if(error){
            this.error = error
           // console.log(error);
        }
    }

     /**Context Loading foe LMS */
     @wire(MessageContext)
     messageContext

     connectedCallback(){
        this.subscribeHandler()
     }
     subscribeHandler(){
     this.carFilterSubscription =  subscribe(this.messageContext,CARS_FILTERED_MESSAGE,(message)=>{
            this.handleFilterChanges(message)
        })
     }
     handleFilterChanges(message){
        console.log(message.filters);
        this.filters = {...message.filters}
     }
     handleCarSelection(event){
        console.log("selected car ",event.detail);
        publish(this.messageContext,CARS_SELECTED_MESSAGE,{carId:event.detail})
     }
     disconnectedCallback(){
        unsubscribe(this.carFilterSubscription)
        this.carFilterSubscription = null
    }
}