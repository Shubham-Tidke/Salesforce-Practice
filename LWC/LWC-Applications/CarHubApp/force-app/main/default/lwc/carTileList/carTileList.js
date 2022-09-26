import { LightningElement, wire } from 'lwc';
import getCars from '@salesforce/apex/CarController.getCars'
export default class CarTileList extends LightningElement {
    cars
    error
    @wire(getCars)
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
}