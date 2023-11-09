import { LightningElement } from 'lwc';
import getNews from '@salesforce/apex/NewsComponentController.getNews';
export default class NewsComponent extends LightningElement {

    connectedCallback() {
        this.fetchNews();
    }
    fetchNews(){
        getNews().then((result)=>{
            if(result){
                console.log('OUTPUT : ',result);
            }
        })
        .catch((error)=>{
            console.log('OUTPUT ERROR: ',error);
        })
    }
}