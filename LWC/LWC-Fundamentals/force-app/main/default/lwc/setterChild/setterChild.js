import { api, LightningElement } from 'lwc';

export default class SetterChild extends LightningElement {
    @api userData;
    
    @api
    get details(){
        return this.userData;
    }
    set details(data){
        //to mutate object data in setter, we need to create
        // a shallow copy of object using spread operator
        this.userData = {...data,name:"Shubham",age:data.age*2,address:"abc"};
    }
}