import axios from "axios";

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;



const getCurrentWeather = (city, countryCode) => {

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${apiKey}`;

    return axios.get(url)
    .then(response => response.data);

}

export default getCurrentWeather;