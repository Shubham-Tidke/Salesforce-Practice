import { LightningElement } from 'lwc';
import getNews from '@salesforce/apex/NewsComponentController.getNews';
import NewsImg from '@salesforce/resourceUrl/NewsImg';
import { NavigationMixin } from 'lightning/navigation';
export default class NewsComponent extends NavigationMixin(LightningElement) {
    value = 'general'
    get options() {
        return [
            { label: 'General', value: 'general' },
            { label: 'Business', value: 'business' },
            { label: 'Entertainment', value: 'entertainment' },            
            { label: 'Health', value: 'health' },
            { label: 'Science', value: 'science' },
            { label: 'Sports', value: 'sports' },
            { label: 'Technology', value: 'technology' }
        ];
    }
    visibleNews = [];
    newsData;
    img = NewsImg;
    connectedCallback() {
        this.fetchNews();
    }
    fetchNews(){
        getNews({category:this.value}).then((result)=>{
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
    handleCategoryChange(event){
        console.log('OUTPUT : ',event.target.value);
        this.value = event.target.value;
        this.fetchNews();
    }
    updateNewsHandler(){
        this.visibleNews = [...event.detail.records]
    }
}