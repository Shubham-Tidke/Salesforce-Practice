import { LightningElement } from 'lwc';
import hasViewAllData from '@salesforce/userPermission/ViewAllData'
import ID from '@salesforce/user/Id' //to fetch user's ID
import isGuest from '@salesforce/user/isGuest' // to check if user is guest or not

export default class UserInfo extends LightningElement {
    userId = ID;
    guest = isGuest;
    get hasViewAllDataAvailable(){
        return hasViewAllData;
    }
}