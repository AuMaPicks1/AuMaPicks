# 😂 Generador de Chistes Aleatorios

Aplicación interactiva para obtener chistes aleatorios de diferentes categorías usando APIs externas y almacenamiento local.

## ✨ Características

- 🎲 **Chistes aleatorios** de múltiples categorías
  - Chistes generales
  - Chistes de programación
  - Chistes "Toc Toc"

- 💾 **Local Storage** - Guarda tus chistes favoritos
- ❤️ **Sistema de favoritos** - Marca y gestiona chistes favoritos
- 🎨 **Interfaz hermosa** - Diseño moderno y responsivo
- ⚡ **Rendimiento rápido** - Carga instantánea de datos
- 📱 **Responsive** - Funciona en todos los dispositivos

## 🚀 Instalación y Uso

### Requisitos
- Node.js 16+ y npm/yarn

### Pasos

```bash
# Navegar a la carpeta del proyecto
cd joke-generator

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🔧 Tecnologías Utilizadas

- **React 18** - Librería UI
- **Vite** - Build tool rápido
- **Fetch API** - Para llamadas a APIs externas
- **LocalStorage** - Para persistencia de datos
- **CSS3** - Estilos modernos y animaciones

## 📚 APIs Externas

### Official Joke API
- URL: `https://official-joke-api.appspot.com`
- Categorías: general, programming, knock-knock
- Respuesta:
```json
{
  "type": "general",
  "setup": "Why did the scarecrow win an award?",
  "punchline": "He was outstanding in his field.",
  "id": 1
}
```

## 💾 Local Storage

Los favoritos se guardan en el navegador:
```javascript
{
  "favoriteJokes": [
    {
      "setup": "Chiste...",
      "punchline": "Punchline...",
      "id": 1234567890,
      "type": "general"
    }
  ]
}
```

## 🎯 Funcionalidades Principales

### 1. Obtener Chistes
- Selecciona la categoría
- Haz clic en "Obtener Chiste"
- ¡Ríete con el resultado!

### 2. Guardar Favoritos
- Haz clic en "Agregar a Favoritos"
- Se guardará automáticamente en el navegador
- Los favoritos se mantienen incluso después de cerrar la app

### 3. Ver Favoritos
- Abre la sección "Mis Chistes Favoritos"
- Elimina los que no quieras
- Limpia todos de una vez

## 📋 Estructura del Proyecto

```
joke-generator/
├── src/
│   ├── components/
│   │   ├── JokeGenerator.jsx      # Componente principal
│   │   └── JokeGenerator.css      # Estilos
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🌐 URL de Desarrollo

```
http://localhost:5174
```

## 📱 Responsive Design

- ✅ Móviles (320px+)
- ✅ Tablets (768px+)
- ✅ Desktops (1024px+)

## 🎨 Temas de Colores

- **Primario**: Gradiente morado (#667eea → #764ba2)
- **Secundario**: Gradiente rojo (#f093fb → #f5576c)
- **Fondo**: Blanco y grises
- **Texto**: Oscuro y contraste

## 🚀 Deployment

```bash
# Build de producción
npm run build

# La carpeta 'dist' contiene los archivos listos para producción
```

Puede deployarse en:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 📝 Licencia

MIT

## 👨‍💻 Autor

Creado por **AuMaPicks1**

---

**Diviértete obteniendo chistes aleatorios! 😄**
