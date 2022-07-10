import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    myQuestions=[
        {
            id : "Question 1",
            questions : "Which of the following is not a template loop ?",
            answers : {
                a : "for:each" ,
                b : "iterator",
                c : "map loop"
            },
            correctAnswer :"c"
        },
        {
            id : "Question 2",
            questions : "Which of the following is invalid LWC component folder ?",
            answers : {
                a : ".svg" ,
                b : ".js",
                c : ".apex"
            },
            correctAnswer :"a"
        },
        {
            id : "Question 3",
            questions : "Which of the following is not a directive ?",
            answers : {
                a : "for:each" ,
                b : "if:true",
                c : "@track"
            },
            correctAnswer :"a"
        }
    ];
    selectedAnswer = {} //storing user's answers
    changeHandler(event){
        // console.log(event.target.name);
        // console.log(event.target.value);
        const name = event.target.name
        const value = event.target.value
        //adding quenstion number and radio input as name and value to object selectedAnswer using spread operator
        this.selectedAnswer = {...this.selectedAnswer, [name]:value};
        console.log(this.selectedAnswer);
    }
    submitQuizHandler(){

    }
    resetQuizHandler(){

    }
}
