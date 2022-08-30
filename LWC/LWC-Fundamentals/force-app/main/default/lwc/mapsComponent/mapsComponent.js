import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/mapController.getAccounts'
export default class MapsComponent extends LightningElement {
    mapMarkers = []
    
    @wire(getAccounts)
    wireHandler({data,error}){
        if(data){
            console.log(data);
            this.formatResponse(data)
        }
        if(error){
            console.error(error);
        }
    }
    //formatting the data to handle it in map
    formatResponse(data){
        this.mapMarkers = data.map(item=>{
            return {
                location:{
                    Street:item.BillingStreet,
                    City:item.BillingCity,
                    State:item.BillingState,
                    PostalCode:item.BillingPostalCode,
                    Country:item.BillingCountry
                },
                icon:'utility:salesforce',
                title:item.Name,
                value:item.Name
            }
        })
        this.selectedMarker = this.mapMarkers.length && this.mapMarkers[1].value
    }
    markerHandler(event){
        this.selectedMarker = event.detail.selectedMarkerValue;//inbuild map's functionality [selectedMarkerValue]
    }
}