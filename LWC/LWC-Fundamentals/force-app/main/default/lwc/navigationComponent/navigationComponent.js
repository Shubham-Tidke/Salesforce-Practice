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
    navigateToViewRecord(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:'0015i00000BVjGqAAL',
                objectApiName:'Account',
                actionName:'view'

            }
        })
    }
    navigateToEditRecord(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:'0015i00000BVjGqAAL',
                objectApiName:'Account',
                actionName:'edit'

            }
        })
    }
    navigateToTab(){
        this[NavigationMixin.Navigate]({
            type:'standard__navItemPage',
            attributes:{
                apiName:'Component_Communication' //tab api name
            }
        })
    }
    navigateToRelatedContacts(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordRelationshipPage',
            attributes:{
                recordId:'0015i00000BVjGqAAL',
                objectApiName:'Account',
                relationshipApiName:'Contacts',
                actionName:'view'
            }
        })
    }
    navigateToSite(){
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'https://www.youtube.com'
            }
        })
    }
    navigateToLWC(){
        var defination ={
            componentDef: 'c:memoryGameComponent'
        }
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'one/one.app#'+btoa(JSON.stringify(defination))
            }
        })
    }
}