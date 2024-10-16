const axios = require(`axios`);

const fetchData = async function(lat,lon){
    try {
        const response = await axios(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime`);
        const currentData = response.data.current;
        const hourlyData = response.data.hourly;
        const dailyData = response.data.daily;
        return {currentData, hourlyData, dailyData};
    } catch (error) {
        alert(`Error, Try again`);alert(`Error, Try again`);
    }
}

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

const updateDate = function(){

}

const updateWeatherText = function(){
    
}

const updateWeatherIcon = function(){
    
}


export {fetchData,covertCity}