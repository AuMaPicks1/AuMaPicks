# AuMaPicks - Tienda de Productos de Limpieza

Tienda personal de e-commerce especializada en productos de limpieza para el hogar.

## 🎯 Características

- ✅ Catálogo de productos con filtros y búsqueda
- ✅ Carrito de compras persistente
- ✅ Sistema de autenticación (registro/login)
- ✅ Checkout con integración de pagos
- ✅ Panel de administración para gestionar productos
- ✅ Perfil de usuario con historial de órdenes
- ✅ Sistema de reseñas y calificaciones

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Librería UI
- **Vite** - Build tool rápido
- **Tailwind CSS** - Estilos
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Zustand** - Manejo de estado

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **Stripe/PayPal** - Pagos

## 📁 Estructura del Proyecto

```
AuMaPicks/
├── frontend/                 # Aplicación React
��   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Páginas principales
│   │   ├── store/           # Zustand store
│   │   ├── services/        # APIs y servicios
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Servidor Node.js/Express
│   ├── models/              # Modelos de MongoDB
│   ├── routes/              # Rutas API
│   ├── controllers/         # Controladores
│   ├── middleware/          # Middleware personalizado
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🚀 Instalación y Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configura tus variables de entorno
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📝 Variables de Entorno

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aupicks
JWT_SECRET=tu_secreto_jwt_aqui
STRIPE_SECRET_KEY=tu_clave_stripe
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🔗 API Endpoints

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto específico
- `POST /api/products` - Crear producto (Admin)
- `PUT /api/products/:id` - Actualizar producto (Admin)
- `DELETE /api/products/:id` - Eliminar producto (Admin)

### Usuarios
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/users/profile` - Perfil de usuario
- `PUT /api/users/profile` - Actualizar perfil

### Órdenes
- `POST /api/orders` - Crear orden
- `GET /api/orders` - Obtener órdenes del usuario
- `GET /api/orders/:id` - Detalles de la orden

### Pagos
- `POST /api/payments/create-intent` - Crear intención de pago
- `POST /api/payments/webhook` - Webhook de Stripe

## 👨‍💻 Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build

# Tests
npm run test
```

## 📦 Dependencias Principales

### Frontend
```json
{
  "react": "^18.2.0",
  "vite": "^4.0.0",
  "tailwindcss": "^3.0.0",
  "react-router-dom": "^6.0.0",
  "axios": "^1.0.0",
  "zustand": "^4.0.0"
}
```

### Backend
```json
{
  "express": "^4.18.0",
  "mongoose": "^7.0.0",
  "jsonwebtoken": "^9.0.0",
  "stripe": "^12.0.0",
  "dotenv": "^16.0.0"
}
```

## 🔐 Seguridad

- ✅ Autenticación JWT
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Validación de entrada
- ✅ CORS configurado
- ✅ Variables de entorno sensibles

## 📱 Responsive Design

La aplicación es completamente responsiva para:
- Móviles (320px+)
- Tablets (768px+)
- Desktops (1024px+)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 📧 Contacto

Para preguntas o sugerencias, contacta a: AuMaPicks1

---

**Versión:** 1.0.0  
**Última actualización:** 2026-08-13
