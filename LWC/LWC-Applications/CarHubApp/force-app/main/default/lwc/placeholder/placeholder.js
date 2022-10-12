import { api, LightningElement } from 'lwc';
import CAR_LOGO from '@salesforce/resourceUrl/carLogo'
export default class Placeholder extends LightningElement {
    @api message
    placeholderUrl  = CAR_LOGO
}