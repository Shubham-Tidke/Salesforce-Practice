import { LightningElement } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader' 
import FONT_AWESOME from '@salesforce/resourceUrl/fontawesome'
export default class MemoryGameComponent extends LightningElement {

    isLibLoaded = false;
    renderedCallback(){
        if(this.isLibLoaded){
            return;
        }
        else{
            loadStyle(this,FONT_AWESOME+'/fontawesome/css/font-awesome.min.css')
            .then(()=>{
                console.log('library loaded');
            }).catch(error => {
                console.log(error);
            })
            this.isLibLoaded = true;
        }
        
    }
}