import { LightningElement } from 'lwc';
import APIKEY from '@salesforce/label/c.covid_data_api_key';
import ENDPOINT from '@salesforce/label/c.covid_data_endpoint';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': APIKEY,
        'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
    }
}

export default class App extends LightningElement {
    totalDeaths
    totalConfirmed
    totalActive
    totalRecovered
    totalFatalityRate
    
    connectedCallback(){
        this.fetchData();
        this.fetchCountryData();

    }
    async fetchData(){
        let response = await fetch(ENDPOINT,options)
        let responseJson = await response.json()//fetch return data in 'datastream',converting it in JSON
        let result = responseJson.data;
        console.log(result);
        this.formatData(result);
    }
    formatData(data){
       this.totalActive = data.active
       this.totalConfirmed = data.confirmed
       this.totalDeaths = data.deaths
       this.totalFatalityRate = data.fatality_rate
    
    }
    async fetchCountryData(){
        let response = await fetch('https://covid-19-statistics.p.rapidapi.com/reports',options)
        let responseJSON = await response.json();//fetch return data in 'datastream',converting it in JSON
        let result = responseJSON.data;
        console.log(result);
    }
}
