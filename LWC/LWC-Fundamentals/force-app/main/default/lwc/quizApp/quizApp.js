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
    correctAnswers = 0 //count of correct answers from user
    isSubmitted = false; 
    
    //storing user's answers
    changeHandler(event){    
        const name = event.target.name
        const value = event.target.value
        //adding quenstion number and radio input as name and value to object selectedAnswer using spread operator
        this.selectedAnswer = {...this.selectedAnswer, [name]:value};
    }

    //form submit handler
    submitQuizHandler(event){
        event.preventDefault()//form refreshes the page by default,to avoid that we use prevent default
        //filter to get correct answers selected by users
        this.isSubmitted = true;
        let correct = this.myQuestions.filter(item => this.selectedAnswer[item.id] === item.correctAnswer)
        this.correctAnswers = correct.length //filter returns an array of correct anwers ,storing the count in variable
        console.log(this.correctAnswers);
    }
    //form reset handler
    resetQuizHandler(){
        this.selectedAnswer = {}
        this.correctAnswers = 0
        this.isSubmitted = false;
    }
   //check if user has attempted all questions
    get allAnswersSelected(){
        return !(Object.keys(this.selectedAnswer).length == this.myQuestions.length)
    }
}
