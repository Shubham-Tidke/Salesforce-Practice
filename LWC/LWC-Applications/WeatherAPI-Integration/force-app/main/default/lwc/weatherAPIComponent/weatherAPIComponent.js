import { LightningElement } from 'lwc';
import weatherStackAPIKey from '@salesforce/label/c.weatherStackAPIKey';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': weatherStackAPIKey,
		'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
	}
};
export default class WeatherAPIComponent extends LightningElement {
    
    location = '';
    weather
    timer
    avgTemp
    humidity
    maxTemp
    minTemp
    primaryWeather
    windDir
    windSpeed
    date
    connectedCallback(){
        this.fetchWeather();
    }
    fetchWeather(){
        fetch('https://aerisweather1.p.rapidapi.com/forecasts/'+this.location+',', options)
	.then(response => response.json())
	.then(data => {
        this.weather = data.response[0].periods[0];
        this.avgTemp = this.weather.avgTempC;
        this.humidity = this.weather.humidity;
        this.maxTemp = this.weather.maxTempC;
        this.minTemp = this.weather.minTempC;
        this.windSpeed = this.weather.windSpeedKPH;
        this.windDir = this.weather.windDir;
        this.primaryWeather = this.weather.weather;
        this.date = this.weather.validTime.substring(0,10);
        //console.log(this.date);        
    })
	.catch(err => console.error(err));
    }

    getLocation(event){
        this.location = event.target.value;
       // console.log(this.location);
        window.clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.fetchWeather()
        }, 1000);
    }
    
}