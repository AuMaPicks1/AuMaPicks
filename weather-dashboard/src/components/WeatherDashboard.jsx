import React, { useState, useEffect } from 'react';
import './WeatherDashboard.css';
import CurrentWeather from './CurrentWeather';
import ForecastCards from './ForecastCards';
import SearchBar from './SearchBar';
import WeatherAlerts from './WeatherAlerts';

function WeatherDashboard() {
  const [city, setCity] = useState('New York');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // metric (°C) o imperial (°F)
  const [savedCities, setSavedCities] = useState(() => {
    const saved = localStorage.getItem('savedCities');
    return saved ? JSON.parse(saved) : ['New York', 'London', 'Tokyo'];
  });
  const [alerts, setAlerts] = useState([]);

  // API Key - Usar OpenWeatherMap API (Registrarse en openweathermap.org)
  const API_KEY = 'demo'; // Reemplazar con tu API key
  const WEATHER_API = 'https://api.openweathermap.org/data/2.5';

  // Obtener coordenadas de la ciudad
  const getCoordinates = async (cityName) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length === 0) throw new Error('Ciudad no encontrada');
      return { lat: data[0].lat, lon: data[0].lon };
    } catch (err) {
      throw new Error('Error al obtener las coordenadas');
    }
  };

  // Obtener clima actual y pronóstico
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const { lat, lon } = await getCoordinates(cityName);

      // Clima actual
      const currentResponse = await fetch(
        `${WEATHER_API}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      if (!currentResponse.ok) throw new Error('Error al obtener el clima');
      const currentData = await currentResponse.json();

      // Pronóstico de 5 días
      const forecastResponse = await fetch(
        `${WEATHER_API}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      if (!forecastResponse.ok) throw new Error('Error al obtener el pronóstico');
      const forecastData = await forecastResponse.json();

      setCurrentWeather(currentData);
      setForecast(forecastData.list.slice(0, 8)); // 8 períodos (24 horas)
      setCity(cityName);

      // Verificar alertas de clima severo
      checkWeatherAlerts(currentData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verificar alertas de clima severo
  const checkWeatherAlerts = (weatherData) => {
    const newAlerts = [];
    const temp = weatherData.main.temp;
    const windSpeed = weatherData.wind.speed;
    const description = weatherData.weather[0].main.toLowerCase();

    if (temp > 35 && unit === 'metric') {
      newAlerts.push({
        id: 'heat',
        type: 'warning',
        title: 'Alerta de Calor',
        message: `Temperatura muy alta: ${temp}°C`
      });
    }
    if (temp < -10 && unit === 'metric') {
      newAlerts.push({
        id: 'cold',
        type: 'warning',
        title: 'Alerta de Frío',
        message: `Temperatura muy baja: ${temp}°C`
      });
    }
    if (windSpeed > 10) {
      newAlerts.push({
        id: 'wind',
        type: 'warning',
        title: 'Vientos Fuertes',
        message: `Velocidad del viento: ${windSpeed} m/s`
      });
    }
    if (['thunderstorm', 'tornado'].includes(description)) {
      newAlerts.push({
        id: 'storm',
        type: 'danger',
        title: 'Tormenta Severa',
        message: `Se detectó ${description}`
      });
    }

    setAlerts(newAlerts);
  };

  // Guardar ciudad
  const saveCity = (cityName) => {
    if (!savedCities.includes(cityName)) {
      const updated = [...savedCities, cityName];
      setSavedCities(updated);
      localStorage.setItem('savedCities', JSON.stringify(updated));
    }
  };

  // Eliminar ciudad guardada
  const removeCity = (cityName) => {
    const updated = savedCities.filter(c => c !== cityName);
    setSavedCities(updated);
    localStorage.setItem('savedCities', JSON.stringify(updated));
  };

  // Cambiar unidad de temperatura
  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    fetchWeather(city);
  };

  // Cargar clima inicial
  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="weather-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-top">
          <h1>🌤️ Dashboard Meteorológico</h1>
          <button className="unit-toggle" onClick={toggleUnit}>
            {unit === 'metric' ? '°F' : '°C'}
          </button>
        </div>
        <p className="subtitle">Información en tiempo real del clima mundial</p>
      </div>

      {/* Search Bar */}
      <SearchBar 
        onSearch={(cityName) => {
          fetchWeather(cityName);
          saveCity(cityName);
        }}
        loading={loading}
      />

      {/* Alertas */}
      {alerts.length > 0 && <WeatherAlerts alerts={alerts} />}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Obteniendo datos del clima...</p>
        </div>
      ) : currentWeather ? (
        <>
          {/* Current Weather */}
          <CurrentWeather weather={currentWeather} unit={unit} />

          {/* Forecast */}
          {forecast.length > 0 && (
            <ForecastCards forecast={forecast} unit={unit} />
          )}
        </>
      ) : null}

      {/* Saved Cities */}
      {savedCities.length > 0 && (
        <div className="saved-cities-section">
          <h2>📍 Ciudades Guardadas</h2>
          <div className="cities-grid">
            {savedCities.map((savedCity) => (
              <div key={savedCity} className="city-card">
                <button
                  className="city-button"
                  onClick={() => {
                    fetchWeather(savedCity);
                  }}
                >
                  {savedCity}
                </button>
                <button
                  className="remove-city"
                  onClick={() => removeCity(savedCity)}
                  title="Eliminar"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
