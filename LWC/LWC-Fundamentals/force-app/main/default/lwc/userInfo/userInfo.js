import { LightningElement } from 'lwc';
import hasViewAllData from '@salesforce/userPermission/ViewAllData'
export default class UserInfo extends LightningElement {
    get hasViewAllDataAvailable(){
        return hasViewAllData;
    }
}