import LightningModal from 'lightning/modal';
export default class ChildComponentThreeCustomEvent extends LightningModal {
    input;
  
    handleInput(event){
      this.input = event.target.value;
      console.log('OUTPUT : ',event.target.value);
    }
    handleSubmitClick(){
        console.log('MSG PUBLISHED!!',this.input);
    }

}