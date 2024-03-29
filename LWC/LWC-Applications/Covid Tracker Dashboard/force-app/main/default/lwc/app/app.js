import { LightningElement, track } from 'lwc';
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
    totalFatalityRate
    isLoading = true
    newData = {}
    countryName
    finalData = []
    copyData=[]
    searchedCountryData = []
    timer
    
    connectedCallback(){
        this.fetchData();
        this.fetchCountryData();

    }
    async fetchData(){
        let response = await fetch(ENDPOINT,options)
        let responseJson = await response.json()//fetch return data in 'datastream',converting it in JSON
        let result = responseJson.data;
       // console.log(result);
        this.totalActive = result.active
        this.totalConfirmed = result.confirmed
        this.totalDeaths = result.deaths
        this.totalFatalityRate = result.fatality_rate
    }
    
    async fetchCountryData(){
        let response = await fetch('https://covid-19-statistics.p.rapidapi.com/reports',options)
        let responseJSON = await response.json();//fetch return data in 'datastream',converting it in JSON
        let result = responseJSON.data;
         
       // console.log(result);
        this.formatData(result);
    }
    searchHandler(event){
        this.countryName = event.target.value
        console.log(this.countryName);
        if(this.countryName){
        window.clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            //this.searchedCountryData=[]
            this.copyData.forEach(element => {  
                if(element.Country.includes(this.countryName)){
                    //console.log(element.Country);
                    this.searchedCountryData.push(element)   
                }
            });
            console.log(this.searchedCountryData);
            this.finalData = this.searchedCountryData
            this.searchedCountryData=[]
        },1000)
        }
        else{
            this.finalData = this.copyData;
        }      
    }
    formatData(result){
        this.isLoading = false
       result.forEach(data => {
        let obj = {
            Country : data.region.name,
            Confirmed : data.confirmed,
            Active : data.active,
            Deaths : data.deaths,
            Fatality_Rate : data.fatality_rate,
            LastUpdate : data.last_update
           
        }
        if(data.region.name in this.newData){
            this.newData[data.region.name].Confirmed += obj.Confirmed;
            this.newData[data.region.name].Active += obj.Active;
            this.newData[data.region.name].Fatality_Rate += obj.Fatality_Rate;
            this.newData[data.region.name].Deaths += obj.Deaths;
            this.newData[data.region.name].LastUpdate += obj.LastUpdate; 
            //this.finalData.push(this.newData[data.region.name]);
           }
           else{
            this.newData[data.region.name] = obj
            this.finalData.push(obj)
           }
           this.copyData = this.finalData
       });
      
       //console.log(this.finalData);
    }
}
