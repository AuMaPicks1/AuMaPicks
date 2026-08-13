# 🌤️ Dashboard Meteorológico

Aplicación React para visualizar datos de clima en tiempo real usando APIs de OpenWeather y Nominatim.

## ✨ Características

### 🌍 Información Meteorológica
- **Clima Actual**
  - Temperatura actual y sensación térmica
  - Temperaturas mín/máx
  - Descripción de condiciones
  - Emoji dinámicos según el clima

- **Datos Detallados**
  - Humedad (💧)
  - Velocidad del viento (🌪️)
  - Presión atmosférica (🔵)
  - Nubosidad (☁️)
  - Visibilidad (👁️)

- **Pronóstico de 24 Horas**
  - Temperatura horaria
  - Condiciones climáticas
  - Humedad y viento
  - Vista de tarjetas interactivas

### 🚨 Alertas Inteligentes
- ⚠️ Alerta de calor extremo (>35°C)
- ❄️ Alerta de frío extremo (<-10°C)
- 💨 Alertas de vientos fuertes (>10 m/s)
- ⛈️ Alertas de tormentas severas

### 💾 Características Adicionales
- 📍 Guardado de ciudades favoritas
- 🔄 Conversión de unidades (°C / °F)
- 📱 Diseño completamente responsivo
- 🎨 Interfaz moderna con gradientes
- 💫 Animaciones suaves

## 🔧 Configuración

### Requisitos
- Node.js 16+ y npm/yarn
- API Key de OpenWeatherMap (gratuita)

### Obtener API Key

1. Ir a https://openweathermap.org/api
2. Registrarse (es gratis)
3. Obtener la API Key en la sección "API Keys"
4. Reemplazar `'demo'` en `WeatherDashboard.jsx` con tu API Key

```javascript
const API_KEY = 'tu_api_key_aqui'; // Línea 23 en WeatherDashboard.jsx
```

## 🚀 Instalación y Uso

```bash
# Navegar a la carpeta
cd weather-dashboard

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## 🌐 APIs Utilizadas

### OpenWeatherMap API
- **URL Base**: `https://api.openweathermap.org/data/2.5`
- **Endpoints**:
  - `/weather` - Clima actual
  - `/forecast` - Pronóstico de 5 días
- **Documentación**: https://openweathermap.org/api

### Nominatim (OpenStreetMap)
- **URL Base**: `https://nominatim.openstreetmap.org`
- **Propósito**: Convertir nombre de ciudad a coordenadas
- **Ventaja**: No requiere API Key

## 📁 Estructura del Proyecto

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── WeatherDashboard.jsx      (Componente principal)
│   │   ├── WeatherDashboard.css      (Estilos principales)
│   │   ├── CurrentWeather.jsx        (Clima actual)
│   │   ├── ForecastCards.jsx         (Pronóstico)
│   │   ├── SearchBar.jsx             (Búsqueda)
│   │   └── WeatherAlerts.jsx         (Alertas)
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Funcionalidades Principales

### 1. Búsqueda de Ciudades
```
- Ingresa el nombre de cualquier ciudad
- Se obtienen automáticamente las coordenadas
- Se muestran datos en tiempo real
```

### 2. Guardar Ciudades
```
- Las ciudades se guardan automáticamente
- Se almacenan en localStorage
- Acceso rápido con un clic
- Opción de eliminar
```

### 3. Cambiar Unidades
```
- Botón para convertir entre °C y °F
- También ajusta las unidades del viento
- Se mantiene la selección
```

### 4. Ver Alertas
```
- Alertas inteligentes según condiciones
- Codificadas por color (warning/danger)
- Se muestran automáticamente
```

## 🎨 Paleta de Colores

- **Primario**: #667eea (Azul Violeta)
- **Secundario**: #764ba2 (Violeta)
- **Alerta Warning**: Gradiente naranja-rojo
- **Alerta Danger**: Gradiente rojo-amarillo
- **Fondo**: Blanco y grises claros

## 📱 Responsive Design

- ✅ Móviles (320px+)
- ✅ Tablets (768px+)
- ✅ Desktops (1024px+)
- ✅ Pantallas grandes (1200px+)

## 🔌 Emojis de Clima

```
☀️  - Soleado
🌙  - Noche clara
⛅  - Parcialmente nublado
☁️  - Nublado
🌧️  - Lluvia
⛈️  - Tormenta
❄️  - Nieve
🌫️  - Niebla
```

## 💡 Mejoras Futuras

- 📊 Gráficos de pronóstico semanal
- 🗺️ Mapa interactivo
- 📊 Historial de datos
- 🔔 Notificaciones push
- 🌙 Modo oscuro
- 🧭 Brújula de viento
- 📍 Ubicación automática

## 🚀 Deployment

```bash
# Build de producción
npm run build

# Archivos listos en carpeta 'dist'
```

Puede desplegarse en:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 📝 Licencia

MIT

## 👨‍💻 Autor

Creado por **AuMaPicks1**

---

**Manténte informado sobre el clima en tiempo real! 🌍**
