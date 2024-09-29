const axios = require('axios');

const fetchWeatherData = async (lat, lon) => {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

module.exports = { fetchWeatherData };
