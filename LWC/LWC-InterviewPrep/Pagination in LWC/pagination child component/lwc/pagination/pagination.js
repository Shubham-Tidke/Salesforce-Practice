import { LightningElement,api } from 'lwc';
export default class Pagination extends LightningElement {
    totalRecords;
    recordSize = 5;
    visibleRecords;
    totalPages;
    currentPage = 1;
    handleNextDisable = false;
    handlePrevDisable = true;
    get records(){
        return this.visibleRecords
    }
    @api set records(data){
        if(data){
            this.totalRecords = data;
            this.totalPages = Math.ceil(data.length/this.recordSize);    
            //console.log('TOTAL PAGES : ',this.totalPages);        
            this.updateRecords();
        }
    }  
    handlePrevClick(){
        this.handleNextDisable = false;
        this.currentPage = this.currentPage - 1;
        //console.log('current page : ',this.currentPage);
        this.updateRecords();
        if(this.currentPage == 1){
            this.handlePrevDisable = true;
        }else{
            this.handlePrevDisable = false;
        }
    }
    handleNextClick(){
        this.handlePrevDisable = false;
         this.currentPage = this.currentPage + 1;
         this.updateRecords();
        if(this.totalPages == this.currentPage){
            this.handleNextDisable = true;
            
        }else{
            this.handleNextDisable = false;             
        }
       
    }
    updateRecords(){
        //console.log('visibleRecords : ',JSON.stringify(this.visibleRecords));
        const start = (this.currentPage-1)*this.recordSize;
        const end = this.currentPage * this.recordSize;
        //console.log('START : ',start);
        //console.log('END : ',end);
        this.visibleRecords = this.totalRecords.slice(start,end);
        this.dispatchEvent(new CustomEvent('update',{
            detail:{
                records:this.visibleRecords
            }
        }))
    }
}