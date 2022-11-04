import { LightningElement } from 'lwc';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6995b0d2bdmsh9726f3610d1fa31p1678dcjsn0e500ff8d5c9',
		'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
	}
};
export default class WeatherAPIComponent extends LightningElement {
    
    location = '';
    weather
    timer
    connectedCallback(){
        this.fetchWeather();
    }
    fetchWeather(){
        fetch('https://aerisweather1.p.rapidapi.com/forecasts/'+this.location+',', options)
	.then(response => response.json())
	.then(data => {
        console.log(data.response[0].periods[0]);
        this.weather = data;
    })
	.catch(err => console.error(err));
    }

    getLocation(event){
        this.location = event.target.value;
        console.log(this.location);
        window.clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.fetchWeather()
        }, 1000);
    }
    
}