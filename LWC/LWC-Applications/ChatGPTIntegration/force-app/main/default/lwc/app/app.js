import { LightningElement, track } from 'lwc';
import chatgptKey from  '@salesforce/label/c.chatgptKey';

export default class App extends LightningElement {
    @track textInput
    @track finalValue
    @track showSpinner = false
    handleInput(event){
        this.textInput = event.target.value;
    }
    handleClick(event){
        this.showSpinner = true
       fetch('https://api.openai.com/v1/completions',
       { method: 'POST',
            headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer '+ chatgptKey 
       },
         body: JSON.stringify({
            "prompt":this.textInput ,
            "model": "text-davinci-003",
            "temperature": 0.0,
            "max_tokens": 4000,
            "stream": false,
            "top_p": 0.5
          })
        })
        .then(response=>response.json())
        .then(result=> {
            this.showSpinner = false
            this.finalValue = result.choices[0].text
            this.finalValue = this.finalValue.replace(/\n/g, "<br />");
           
            //console.log("response ::  "+this.finalValue)
        })
    }
}