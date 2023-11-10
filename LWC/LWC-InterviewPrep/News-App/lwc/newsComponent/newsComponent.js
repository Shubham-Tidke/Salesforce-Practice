import { LightningElement } from 'lwc';
import getNews from '@salesforce/apex/NewsComponentController.getNews';
import NewsImg from '@salesforce/resourceUrl/NewsImg';
import { NavigationMixin } from 'lightning/navigation';
export default class NewsComponent extends NavigationMixin(LightningElement) {
    newsData;
    img = NewsImg;
    connectedCallback() {
        this.fetchNews();
    }
    fetchNews(){
        getNews().then((result)=>{
            if(result){
                this.newsData = (result.articles);
                console.log('OUTPUT : ',result);
            }
        })
        .catch((error)=>{
            console.log('OUTPUT ERROR: ',error);
        })
    }
    newsClickHandler(event){
        console.log('OUTPUT : ',event.currentTarget.dataset.id);
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:event.currentTarget.dataset.id
            }
        })
    }
}