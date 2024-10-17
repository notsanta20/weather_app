import "./output.css"
import { fetchData,covertCity,updateDate,updateWeatherText,updateWHR } from "./modules/fetch_data.js";

let cityName = `chennai`;
const elements = {
    city: document.querySelector(`.city`),
    currentDate: document.querySelector(`.current-date`),
    currentTemp: document.querySelector(`.current-temp`),
    currentTempText: document.querySelector(`.current-temp-text`),
    wind: document.querySelector(`.wind-text1`),
    humidity: document.querySelector(`.humidity-text1`),
    rain: document.querySelector(`.rain-text1`)
}

function updateDom(weather,city){
    elements.city.textContent = city.name.toUpperCase();
    elements.currentTemp.textContent = `${weather.currentData.temperature_2m}°`;
}



async function getData(cityName) {
        const cityLatLon = await covertCity(cityName);
        const fullWeather = await fetchData(cityLatLon.latitude,cityLatLon.longitude);
        updateDom(fullWeather,cityLatLon);
        updateWeatherText(fullWeather,elements);
        updateWHR(fullWeather,elements);
}  


const searchBtn = document.querySelector(`.search`);

searchBtn.addEventListener(`click`, ()=>{
    const input = prompt(`Enter a city name`);
    cityName = input.toLowerCase();
    getData(cityName);
});

updateDate(elements);
// getData(`chennai`);

// currentData{
// is_day: 0,
// precipitation: 0,
// relative_humidity_2m: 94,
// temperature_2m: 19.3,
// weather_code: 1,
// wind_speed_10m: 5.1,
// }