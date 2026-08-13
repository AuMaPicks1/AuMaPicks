import React from 'react';

function CurrentWeather({ weather, unit }) {
  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const tempMin = Math.round(weather.main.temp_min);
  const tempMax = Math.round(weather.main.temp_max);
  const humidity = weather.main.humidity;
  const pressure = weather.main.pressure;
  const windSpeed = weather.wind.speed;
  const cloudiness = weather.clouds.all;
  const description = weather.weather[0].description;
  const icon = weather.weather[0].icon;
  const unit_symbol = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';

  // Mapear iconos de clima
  const getWeatherEmoji = (iconCode) => {
    const emojiMap = {
      '01d': '☀️',
      '01n': '🌙',
      '02d': '⛅',
      '02n': '☁️',
      '03d': '☁️',
      '03n': '☁️',
      '04d': '☁️',
      '04n': '☁️',
      '09d': '🌧️',
      '09n': '🌧️',
      '10d': '🌦️',
      '10n': '🌧️',
      '11d': '⛈️',
      '11n': '⛈️',
      '13d': '❄️',
      '13n': '❄️',
      '50d': '🌫️',
      '50n': '🌫️',
    };
    return emojiMap[iconCode] || '🌤️';
  };

  return (
    <div className="current-weather-container">
      <div className="current-weather">
        <div className="weather-icon-section">
          <div className="weather-emoji">{getWeatherEmoji(icon)}</div>
          <div className="temperature-main">{temp}{unit_symbol}</div>
        </div>

        <div className="weather-info-section">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="description">{description.toUpperCase()}</p>
          <p className="feels-like">Sensación térmica: {feelsLike}{unit_symbol}</p>

          <div className="weather-details-grid">
            <div className="detail-card">
              <span className="detail-icon">🌡️</span>
              <span className="detail-label">Mín/Máx</span>
              <span className="detail-value">{tempMin}{unit_symbol} / {tempMax}{unit_symbol}</span>
            </div>
            <div className="detail-card">
              <span className="detail-icon">💧</span>
              <span className="detail-label">Humedad</span>
              <span className="detail-value">{humidity}%</span>
            </div>
            <div className="detail-card">
              <span className="detail-icon">🌪️</span>
              <span className="detail-label">Viento</span>
              <span className="detail-value">{windSpeed} {windUnit}</span>
            </div>
            <div className="detail-card">
              <span className="detail-icon">🔵</span>
              <span className="detail-label">Presión</span>
              <span className="detail-value">{pressure} hPa</span>
            </div>
            <div className="detail-card">
              <span className="detail-icon">☁️</span>
              <span className="detail-label">Nubosidad</span>
              <span className="detail-value">{cloudiness}%</span>
            </div>
            <div className="detail-card">
              <span className="detail-icon">👁️</span>
              <span className="detail-label">Visibilidad</span>
              <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
