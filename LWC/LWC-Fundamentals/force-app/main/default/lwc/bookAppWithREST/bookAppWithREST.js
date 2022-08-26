import { LightningElement } from 'lwc';
const BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
export default class BookAppWithREST extends LightningElement {

    query =' '
    books
    timer
    //since api needs to be called when component gets loaded
    connectedCallback(){
        this.fetchBookData();
    }
    fetchBookData(){
        fetch(BOOKS_URL+this.query)
        .then(response=>response.json())
        .then(data =>{
            console.log(data);
            this.books = data
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    getBookName(event){
        this.query = event.target.value
       // this.fetchBookData()
        //debouncing technique to search efficiently
        window.clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.fetchBookData()
        }, 1000);
    }
}