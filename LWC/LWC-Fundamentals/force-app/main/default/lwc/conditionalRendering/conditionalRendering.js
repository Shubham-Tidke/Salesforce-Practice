import { LightningElement } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    isVisible = false;
    course;
    onClick(){
        if(this.isVisible == false)
            this.isVisible = true;
        else
            this.isVisible = false;
    }
    changeHandler(event){
        this.course = event.target.value;
    }
    get checkCourse(){
        return this.course === 'LWC';
    }
}