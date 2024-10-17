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
        alert(`Error, Try again`);
    }
}

//get Latitude and Longitude of a city
const covertCity = async function(cityName){
    try {
        const config = {headers:{ 'x-api-key': '3PkatoaXRFVsNBlIIy8qSA==oBlz0frN5OttAIKr'}};
        const response = await axios(`https://api.api-ninjas.com/v1/geocoding?city=${cityName}`, config);
        const city = response.data[0];
        return city;
    } catch (error) {
        alert(`Error, Try again`);
    }
}

//update date and time in DOM
const updateDate = function(element){
    const date = new Date();
    const month = [`JAN`,`FEB`,`MAR`,`APR`,`MAY`,`JUN`,`JUL`,`AUG`,`SEP`,`OCT`,`NOV`,`DEC` ];
    const days = [`SUNDAY`,`MONDAY`,`TUESDAY`,`WEDNESDAY`,`THURSDAY`,`FRIDAY`,`SATURDAY`];
    
    element.currentDate.textContent = `${date.getDate()} ${month[date.getMonth()]}, ${days[date.getDay()]}`;

    let hours = date.getHours();
    let format = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const test = document.querySelector(`.test`)
    test.textContent = `${hours} ${format}`
    
}

//update Weather text in DOM
const updateWeatherText = function(code,element){
    const weatherCodes = {
        0: `Clear`,
        1: `Clear,`,
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
        82: `violent Rain Showers`,
        85: `Slight Snow Showers`,
        86: `Heavy Snow Showers`,
        95: `Thunderstorm`,
        96: `Thunderstorm`,
        99: `Hail Thunderstorm`
    };
    let num = code.currentData.weather_code;
    element.currentTempText.textContent = weatherCodes[num];
}

//update weather icons
const updateWeatherIcon = function(){
    
}

//update Wind, Humidity and Rain data in DOM
const updateWHR = function(weather,elements){
    elements.wind.textContent = `${weather.currentData.wind_speed_10m} Km/h`;
    elements.humidity.textContent = `${weather.currentData.relative_humidity_2m}%`;
    elements.rain.textContent = `${weather.currentData.precipitation}mm`;
}


export {fetchData,covertCity,updateDate,updateWeatherText,updateWHR}