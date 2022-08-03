import { LightningElement } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader' 
import FONT_AWESOME from '@salesforce/resourceUrl/fontawesome'
export default class MemoryGameComponent extends LightningElement {

    isLibLoaded = false;
    openedCards=[]//to let user open only 2 cards at a time
    moves = 0 //counting no. of moves
    matchedCard=[]//to store matched cards
    cards = [
        {id:1, listClass:"card", type:'podcast', icon:'fa fa-podcast'},
        {id:2, listClass:"card", type:'bomb', icon:'fa fa-bomb'},
        {id:3, listClass:"card", type:'cogs', icon:'fa fa-cogs'},
        {id:4, listClass:"card", type:'tree', icon:'fa fa-tree'},
        {id:5, listClass:"card", type:'bolt', icon:'fa fa-bolt'},
        {id:6, listClass:"card", type:'sort', icon:'fa fa-sort'},
        {id:7, listClass:"card", type:'shuttle', icon:'fa fa-space-shuttle'},
        {id:8, listClass:"card", type:'wallet', icon:'fa fa-google-wallet'},
        {id:9, listClass:"card", type:'podcast', icon:'fa fa-podcast'},
        {id:10, listClass:"card", type:'bomb', icon:'fa fa-bomb'},
        {id:11, listClass:"card", type:'cogs', icon:'fa fa-cogs'},
        {id:12, listClass:"card", type:'tree', icon:'fa fa-tree'},
        {id:13, listClass:"card", type:'bolt', icon:'fa fa-bolt'},
        {id:14, listClass:"card", type:'sort', icon:'fa fa-sort'},
        {id:15, listClass:"card", type:'shuttle', icon:'fa fa-space-shuttle'},
        {id:16, listClass:"card", type:'wallet', icon:'fa fa-google-wallet'},
    ]

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
    displayCard(event){
        let currCard = event.target;
        currCard.classList.add("open","show","disabled")//adding css classes
        this.openedCards = this.openedCards.concat(event.target)//adding opened cards in array
        if (this.openedCards.length == 2) {
            this.moves = this.moves+1 //updating moves
            if (this.openedCards[0].type === this.openedCards[1].type) {
                this.matchedCard= this.matchedCard.concat(this.openedCards[0],this.openedCards[1])
                this.matched()
            }
            else
            this.unmatched()
        }
    }
    matched(){
        this.openedCards[0].classList.add("match","disabled")
        this.openedCards[1].classList.add("match","disabled")
        this.openedCards[0].classList.remove("show","open")
        this.openedCards[1].classList.remove("show","open")
        
        this.matchedCard=[]
    }
    unmatched(){
        this.openedCards[0].classList.add("unmatch")
        this.openedCards[1].classList.add("unmatch")
        this.action('DISABLE')
        setTimeout(()=>{
            this.openedCards[0].classList.remove("unmatch","show","open")
            this.openedCards[1].classList.remove("unmatch","show","open")
            this.action('ENABLE');
            this.matchedCard=[]
        },1100)
    }
    action(action){
        let cards  = this.template.querySelectorAll('.card')
        //converting node like array to array
        Array.from(cards).forEach(item=>{
            if(action === 'ENABLE'){
               let isMatch = item.classList.contains('match')
               if(!isMatch){
                item.classList.remove('disabled')
               }
            }
            if(action === 'DISABLE'){
                item.classList.add('disabled')
             }
        })
    }
}