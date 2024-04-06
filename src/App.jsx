// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherPage from './components/WeatherPage';
import DetailedWeatherPage from './components/DetailedWeatherPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherPage />} />
        <Route path="/details/:index" element={<DetailedWeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
