import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
import {encodeDefaultFieldValues} from 'lightning/pageReferenceUtils' //for getting default values
export default class NavigationComponent extends NavigationMixin(LightningElement) {
    navigateToHome(){
        this[NavigationMixin.Navigate]({
            type:'standard__namedPage',
            attributes:{
                pageName:'home'
            }
        })
    }
    navigateToChatter(){
        this[NavigationMixin.Navigate]({
            type:'standard__namedPage',
            attributes:{
                pageName:'chatter'
            }
        })
    }
    navigateToAccount(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Account',
                actionName : 'new'
            }
        })
    }
    navigateToContact(){
        const defaultValue = encodeDefaultFieldValues({
            FirstName:'Shubham',
            LastName :'Tidke'
        })
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Contact',
                actionName : 'new'
            },
            state:{
                //mapping record field values to our values 
                defaultFieldValues : defaultValue
            }
        })
    }
    navigateToList(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Account',
                actionName:'list'
            },
            state:{
                filter:'Recent'
            }
        })
    }
}