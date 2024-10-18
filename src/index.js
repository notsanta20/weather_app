import "./output.css"
import { fetchData,convertCity,updateCityTemp,updateDate,updateWeatherText,updateWHR,updateIcon} from "./modules/fetch_data.js";

let cityName = `chennai`;
let isCelsius = true;
let currentTemp = ``;
const searchBtn = document.querySelector(`.search`);
const scaleBtn = document.querySelector(`.temp-icon`);
const elements = {
    city: document.querySelector(`.city`),
    currentDate: document.querySelector(`.current-date`),
    currentTemp: document.querySelector(`.current-temp`),
    currentTempText: document.querySelector(`.current-temp-text`),
    currentTempIcon: document.querySelector(`.current-temp-icon`),
    wind: document.querySelector(`.wind-text1`),
    humidity: document.querySelector(`.humidity-text1`),
    rain: document.querySelector(`.rain-text1`)
}

//get City and weather data
async function getData(cityName) {
    const cityLatLon = await convertCity(cityName);
    const fullWeather = await fetchData(cityLatLon.latitude,cityLatLon.longitude);
    currentTemp = fullWeather.currentData.temperature_2m;
    updateCityTemp(elements,cityName,currentTemp,isCelsius);
    updateWeatherText(fullWeather,elements);
    updateWHR(fullWeather,elements);
    updateIcon(fullWeather,elements.currentTempIcon);
} 

//Onclick search city
searchBtn.addEventListener(`click`, ()=>{
    let input = prompt(`Enter a city name`);
    if(input !== `` && input !== null){
        if(input.length > 2){
            cityName = input.toLowerCase();
            getData(cityName);
        }
        else{
            alert(`City name need to be 3 or more characters`);
        }
    }
});

//Onclick change C to F
scaleBtn.addEventListener(`click`, ()=>{
    if(isCelsius){
        isCelsius = false;
        scaleBtn.src = "../src/assets/icons/fahrenheit.svg";
    }
    else{
        isCelsius = true;
        scaleBtn.src = "../src/assets/icons/celsius.svg";
    }
    updateCityTemp(elements,cityName,currentTemp,isCelsius);
})

updateDate(elements.currentDate);
getData(`chennai`);

