import { LightningElement } from 'lwc';
const APPID = 'ab99b6855b103cd8ffa9117873cfae2f';
const options = {
	method: 'GET',
    redirect: 'follow'
	
};
export default class WeatherApp extends LightningElement {
    city;
    cityLat;
    cityLong
    weatherResponse = false;
    cityTempreature;
    location;
    feelsLike;
    humidity;
    weatherDescription;
    statusCode = false;
    //clear,clouds,rain
    handleCityInput(event){
        //console.log("city : ",event.target.value);
        this.city = event.target.value;
    }
    searchCityHandler(){
        //console.log("City is :", options);
        const lwcInputFields = this.template.querySelectorAll('lightning-input');
        
        const url = 'https://api.openweathermap.org/data/2.5/weather?q='+this.city+'&appid='+APPID;
        console.log(url);
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.cod == 200)
                this.statusCode = true;
            else
                this.statusCode = false;
            this.weatherResponse = true;
            this.cityTempreature = Math.ceil(data.main.temp - 273.15);
            this.feelsLike = data.main.feels_like;
            this.location = data.name+','+data.sys.country;
            this.humidity = data.main.humidity;
            this.weatherDescription = data.weather[0].description;
            console.log(this.weatherResponse.weather[0].main);
            if(lwcInputFields){
                lwcInputFields.forEach(field =>{
                    field.value = null;
                })
            }
        })
        .catch(error =>{
            console.log(error);
        })
        
    }
    handleBackClick(){
        this.weatherResponse = false
    }
}