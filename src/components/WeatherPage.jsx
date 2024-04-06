// WeatherPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';

function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,uv_index_max,precipitation_sum,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles&past_days=7&forecast_days=1');
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const createBarGraph = () => {
    if (!weatherData) return;
  
    const ctx = document.getElementById('weatherChart').getContext('2d');

    const reversedLabels = ['Today'].concat(weatherData.daily.time.slice(1, 8).reverse());
    const reversedData = [weatherData.daily.temperature_2m_max[0]].concat(weatherData.daily.temperature_2m_max.slice(1, 8).reverse());
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: reversedLabels,
        datasets: [{
          label: 'Temperature (°F)',
          data: reversedData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  useEffect(() => {
    createBarGraph();
  }, [weatherData]);

  return (
    <div>
      <h1>Weather Page</h1>
      {weatherData && (
        <div>
          <canvas id="weatherChart"></canvas>
          <h2>Temperature (Latest): {weatherData.daily.temperature_2m_max[0]}°F</h2>
          <Link to={`/details/0`}>View Details (Latest)</Link>
          <h2>Past 7 Days Weather</h2>
          {weatherData.daily.time.slice(1, 8).map((day, index) => (
            <div key={index}>
              <p>Date: {day}</p>
              <p>Temperature: {weatherData.daily.temperature_2m_max[index + 1]}°F</p>
              <Link to={`/details/${index + 1}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
