import { LightningElement } from 'lwc';
import USER_IMAGE from '@salesforce/resourceUrl/user_image'
import MOMENT from '@salesforce/resourceUrl/moment'
import ANIMATE from '@salesforce/resourceUrl/animate'
import {loadScript,loadStyle} from 'lightning/platformResourceLoader' //required to load external JS files and CSS files
export default class StaticResources extends LightningElement {
        userImage = USER_IMAGE
        currentDate = ''
        isLibLoaded = false
        //third party JS file will be used when html is completely loaded,hence rendered callback is used to work with loadscript
        renderedCallback(){
           if (this.isLibLoaded) {
            return;
           } else{
            Promise.all([
                loadStyle(this,ANIMATE+'/animate/animate.min.css'),
                loadScript(this,MOMENT+'/moment/moment.min.js')
                ]).then(()=>{
                    this.setDateOnScreeen();
                })
                 this.isLibLoaded = true             
            }
        }
        setDateOnScreeen(){
           this.currentDate = moment().format('LLLL');
        }
}