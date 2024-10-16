import "./output.css"
import { fetchData,covertCity } from "./modules/fetch_data.js";

let cityName = `chennai`;
const elements = {
    city: document.querySelector(`.city`),
    currentDate: document.querySelector(`.current-date`),
    currentTemp: document.querySelector(`.current-temp`),
    currentTempText: document.querySelector(`.current-temp-text`),
}

function updateDom(weather,city){
    elements.city.textContent = city.name.toUpperCase();
    elements.currentTemp.textContent = `${weather.currentData.temperature_2m}°`;
}



async function getData() {
    const data = await covertCity(cityName);
    const weather = await fetchData(data.latitude,data.longitude);
    updateDom(weather,data);
}  


const searchBtn = document.querySelector(`.search`);

searchBtn.addEventListener(`click`, ()=>{
    const input = prompt(`Enter a city name`);
    cityName = input.toLowerCase();
    getData(cityName);
})

// currentData{
// is_day: 0,
// precipitation: 0,
// relative_humidity_2m: 94,
// temperature_2m: 19.3,
// weather_code: 1,
// wind_speed_10m: 5.1,
// }