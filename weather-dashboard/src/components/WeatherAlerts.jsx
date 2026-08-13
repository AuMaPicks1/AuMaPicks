import React from 'react';

function WeatherAlerts({ alerts }) {
  return (
    <div className="alerts-container">
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <div className="alert-icon">
            {alert.type === 'danger' ? '⛔' : '⚠️'}
          </div>
          <div className="alert-content">
            <h3>{alert.title}</h3>
            <p>{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherAlerts;
