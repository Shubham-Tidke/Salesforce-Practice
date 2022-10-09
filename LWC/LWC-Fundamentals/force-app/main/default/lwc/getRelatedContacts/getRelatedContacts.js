import { api, LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
export default class NavigationComponent extends NavigationMixin(LightningElement) {
    @api recordId;

    @api async invoke() {
        this[NavigationMixin.Navigate]({
            type:'standard__recordRelationshipPage',
            attributes:{
                recordId:this.recordId,
                objectApiName:'Account',
                relationshipApiName:'Contacts',
                actionName:'view'
            }
        })  
    }
}