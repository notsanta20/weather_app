const axios = require(`axios`);

//Fetch weather data
const fetchData = async function(lat,lon){
    try {
        const response = await axios(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime`);
        const currentData = response.data.current;
        const hourlyData = response.data.hourly;
        const dailyData = response.data.daily;
        return {currentData, hourlyData, dailyData};
    } catch (error) {
        errorPopup();
    }
}

//get Latitude and Longitude of a city
const convertCity = async function(cityName){
    try {
        const config = {headers:{ 'x-api-key': '3PkatoaXRFVsNBlIIy8qSA==oBlz0frN5OttAIKr'}};
        const response = await axios(`https://api.api-ninjas.com/v1/geocoding?city=${cityName}`, config);
        const city = response.data[0];
        return city;
    } catch (error) {
        errorPopup();
    }
}

//update City Name and Current Temp
function updateCityTemp(elements,city,weather,scale){
    elements.city.textContent = city.toUpperCase();

    //check and convert C to F
    if(!scale){
        let fahrenheit = weather * 1.8 + 32;
        elements.currentTemp.textContent = `${fahrenheit}°`;
    }
    else{
        elements.currentTemp.textContent = `${weather}°`;
    }
}

//update date and time in DOM
const updateDate = function(element){
    const date = new Date();
    const month = [`JAN`,`FEB`,`MAR`,`APR`,`MAY`,`JUN`,`JUL`,`AUG`,`SEP`,`OCT`,`NOV`,`DEC` ];
    const days = [`SUNDAY`,`MONDAY`,`TUESDAY`,`WEDNESDAY`,`THURSDAY`,`FRIDAY`,`SATURDAY`];
    
    element.textContent = `${date.getDate()} ${month[date.getMonth()]}, ${days[date.getDay()]}`;   
}

//update Weather text in DOM
const updateWeatherText = function(code,element){
    const weatherCodes = {
        0: `Clear`,
        1: `Clear`,
        2: `partly Cloudy`,
        3: `Overcast`,
        45: `Fog`,
        48: `Fog`,
        51: `Light Drizzle`,
        53: `Moderate Drizzle`,
        55: `High Drizzle`,
        56: `Light Drizzle`,
        57: `High Drizzle`,
        61: `Slight Rain`,
        63: `Moderate Rain`,
        65: `High Rain`,
        66: `Slight Rain`,
        67: `High Rain`,
        71: `Slight Snow Fall`,
        73: `Moderate Snow Fall`,
        75: `Heavy Snow Fall`,
        77: `Snow grains`,
        80: `Slight Rain Showers`,
        81: `Moderate Rain Showers`,
        82: `Violent Rain Showers`,
        85: `Slight Snow Showers`,
        86: `Heavy Snow Showers`,
        95: `Thunderstorm`,
        96: `Thunderstorm`,
        99: `Hail Thunderstorm`
    };
    let num = code.currentData.weather_code;
    element.currentTempText.textContent = weatherCodes[num];
}

//update Wind, Humidity and Rain data in DOM
const updateWHR = function(weather,elements){
    elements.wind.textContent = `${weather.currentData.wind_speed_10m} Km/h`;
    elements.humidity.textContent = `${weather.currentData.relative_humidity_2m}%`;
    elements.rain.textContent = `${weather.currentData.precipitation}mm`;
}

//update Weather Icon
const updateIcon = function(code,element){
    let num = code.currentData.weather_code;
    let isDay = code.currentData.is_day;

    if(num == `0` || num == `1`){
        if(isDay){
            element.src = "../src/assets/icons/clear-day.svg"
        }
        else{
            element.src = "../src/assets/icons/clear-night.svg"
        }
    }
    else if(num == `2`){
        element.src = "../src/assets/icons/partly-cloudy.svg"
    }
    else if(num == `3`){
        element.src = "../src/assets/icons/overcast.svg"
    }
    else if(num == `45` || num == `48`){
        element.src = "../src/assets/icons/fog.svg"
    }
    else if(num == `51` || num == `53` || num == `55` || num == `56` || num == `57`){
        element.src = "../src/assets/icons/drizzle.svg"
    }
    else if(num == `61` || num == `63` || num == `65` || num == `66` || num == `67`){
        element.src = "../src/assets/icons/rain.svg"
    }
    else if(num == `71` || num == `73` ||num == `75`){
        element.src = "../src/assets/icons/snow.svg"
    }
    else if(num == `77`){
        element.src = "../src/assets/icons/snowflake.svg"
    }
    else if(num == `80` || num == `81` ||num == `82`){
        element.src = "../src/assets/icons/thunderstorms-rain.svg"
    }
    else if(num == `85` || num == `86`){
        element.src = "../src/assets/icons/thunderstorms-snow.svg"
    }
    else if(num == `95` || num == `96` ||num == `99`){
        element.src = "../src/assets/icons/thunderstorms.svg"
    }
}

const errorPopup = function(){
    const error = document.querySelector(`.error`);
    error.style.visibility = `visible`;
    setTimeout(()=>{
        error.style.visibility = `hidden`;
    },2000);
}


export {fetchData,convertCity,updateCityTemp,updateDate,updateWeatherText,updateWHR,updateIcon,errorPopup}