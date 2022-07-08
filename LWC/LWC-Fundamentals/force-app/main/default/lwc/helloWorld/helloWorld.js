import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    name = "User"; //name is a normal property hence no tracking required
    changeHandler(event){
        this.name = event.target.value;
    }
//City is normal object without @track decorator due to which,
//any changes done in the properties of city will not be tracked.
    city = {
        pin : "1234",
        town : "Pune"
    }
//JS doesnot suggest to mutate the data,instead of track using spread operator
// new copy of an object can be created where new property can be updated
    nonTrackHandler(event){
        this.city = {...this.city, "town" : event.target.value};
    }
    @track
    address = {
        pincode : "1234"
    }   
    trackHandler(event){
        this.address.pincode = event.target.value;
    }

    //getter example
    users = ["shubham","Kiran","Mehul"];
    get firstUser(){
        return this.users[0].toUpperCase();
    }
}