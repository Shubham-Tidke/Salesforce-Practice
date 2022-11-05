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
    connectedCallback(){
        this.fetchWeather();
    }
    fetchWeather(){
        fetch('https://aerisweather1.p.rapidapi.com/forecasts/'+this.location+',', options)
	.then(response => response.json())
	.then(data => {
        this.weather = data.response[0].periods[0];
       // console.log(this.weather);
        console.log("Weather Forecast at "+this.location);
        console.log("Average Temperature is :"+this.weather.avgTempC+"°C");
        console.log("Maximum Temperature Expected : "+this.weather.maxTempC+"°C");
        console.log("Minimum Temperature Expected : "+this.weather.minTempC+"°C");
        console.log("Humidity : "+this.weather.humidity+" g.m-3 ");
        console.log("Wind Speed & Direction :"+this.weather.windSpeedKPH+" KMPH,"+this.weather.windDir);
        console.log("Overall Weather will be "+this.weather.weather);
        
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