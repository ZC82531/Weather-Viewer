// DetailedWeatherPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailedWeatherPage() {
  const {index} = useParams(); 
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,uv_index_max,precipitation_sum,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles&past_days=7&forecast_days=1`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [index]); 
  return (
    <div>
      <h1>Detailed Weather Page</h1>
      {weatherData && (
        <div>
          <p>Date: {weatherData.daily.time[index]}</p>
          <p>Temperature: {weatherData.daily.temperature_2m_max[index]}°F</p>
          <p>UV Index: {weatherData.daily.uv_index_max[index]}</p>
          <p>Precipitation: {weatherData.daily.precipitation_sum[index]} inch</p>
          <p>Precipitation Probability: {weatherData.daily.precipitation_probability_max[index]}%</p>
        </div>
      )}
    </div>
  );
}

export default DetailedWeatherPage;
