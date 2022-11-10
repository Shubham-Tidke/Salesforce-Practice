import { LightningElement } from 'lwc';
import APIKEY from '@salesforce/label/c.covid_data_api_key';
import ENDPOINT from '@salesforce/label/c.covid_data_endpoint';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': APIKEY,
        'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
    }
};
export default class App extends LightningElement {
    connectedCallback(){
        this.fetchData();
    }
    fetchData(){
        fetch(ENDPOINT,options)
        .then(response=>response.json)
        .then(data=>{
            console.log('data: '+JSON.stringify(data));
        })
        .catch(err => console.error(err));
       
    }
}