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
    countryData
    
    connectedCallback(){
        this.fetchData();
        this.fetchCountryData();

    }
    async fetchData(){
        let response = await fetch(ENDPOINT,options)
        let responseJson = await response.json()//fetch return data in 'datastream',converting it in JSON
        let result = responseJson.data;
        console.log(result);
        this.totalActive = result.active
        this.totalConfirmed = result.confirmed
        this.totalDeaths = result.deaths
        this.totalFatalityRate = result.fatality_rate
    }
    
    async fetchCountryData(){
        let response = await fetch('https://covid-19-statistics.p.rapidapi.com/reports',options)
        let responseJSON = await response.json();
        let result = responseJSON.data;
        this.countryData = result;
        console.log(result);
        this.formatData(result);
    }
    formatData(result){
       let finalData = {
        
       }
       result.forEach(data => {
       // console.log(data.confirmed);
       });
      
    }
}