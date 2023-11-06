import { LightningElement } from 'lwc';
const APIKEY = 'ab99b6855b103cd8ffa9117873cfae2f';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6995b0d2bdmsh9726f3610d1fa31p1678dcjsn0e500ff8d5c9'
        // 'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
	}
};
export default class WeatherApp extends LightningElement {
    city;
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
        const url = 'https://open-weather13.p.rapidapi.com/city/'+this.city;
        console.log(url);
        fetch(url,options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.cod == 200)
                this.statusCode = true;
            else
                this.statusCode = false;
            this.weatherResponse = true;
            this.cityTempreature = Math.ceil(data.main.temp * 0.31);
            this.feelsLike = data.main.feels_like;
            this.location = data.name+','+data.sys.country;
            this.humidity = data.main.humidity;
            //this.weatherDescription = data.weather[0].description;
            //console.log(this.weatherResponse.weather[0].main);
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
}