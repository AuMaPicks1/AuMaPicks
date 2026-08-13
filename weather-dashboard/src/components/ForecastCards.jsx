import React from 'react';

function ForecastCards({ forecast, unit }) {
  const getWeatherEmoji = (iconCode) => {
    const emojiMap = {
      '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return emojiMap[iconCode] || '🌤️';
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const unit_symbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="forecast-section">
      <h2>📊 Pronóstico de 24 Horas</h2>
      <div className="forecast-grid">
        {forecast.map((item, index) => (
          <div key={index} className="forecast-card">
            <p className="forecast-time">{formatTime(item.dt_txt)}</p>
            <div className="forecast-emoji">{getWeatherEmoji(item.weather[0].icon)}</div>
            <p className="forecast-temp">{Math.round(item.main.temp)}{unit_symbol}</p>
            <p className="forecast-description">{item.weather[0].main}</p>
            <div className="forecast-details">
              <span>💧 {item.main.humidity}%</span>
              <span>🌪️ {item.wind.speed.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCards;
