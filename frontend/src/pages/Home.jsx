import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Bienvenido a AuMaPicks</h1>
          <p className="text-xl mb-8">
            Tu tienda online de confianza para productos de limpieza de calidad
          </p>
          <Link to="/products" className="btn btn-primary inline-block text-lg px-8 py-3">
            Explorar Productos
          </Link>
        </div>
      </section>

      {/* Categorías Destacadas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Categorías Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { name: 'Desinfectantes', emoji: '🧼', slug: 'desinfectantes' },
            { name: 'Detergentes', emoji: '🧴', slug: 'detergentes' },
            { name: 'Ambientadores', emoji: '💨', slug: 'ambientadores' },
            { name: 'Accesorios', emoji: '🧹', slug: 'accesorios' },
            { name: 'Especiales', emoji: '✨', slug: 'especiales' },
          ].map((category) => (
            <Link
              key={category.slug}
              to={`/products?category=${category.slug}`}
              className="card text-center hover:scale-105 transform transition"
            >
              <div className="text-4xl mb-2">{category.emoji}</div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Características */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Por qué elegir AuMaPicks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🚚', title: 'Envío Rápido', desc: 'Entrega en 24-48 horas' },
              { icon: '✅', title: 'Productos Certificados', desc: 'Garantía de calidad' },
              { icon: '💳', title: 'Pago Seguro', desc: 'Múltiples formas de pago' },
            ].map((feature, idx) => (
              <div key={idx} className="card text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comprar?</h2>
          <p className="text-lg mb-8">Accede a nuestro catálogo completo y disfruta de ofertas especiales</p>
          <Link to="/products" className="btn btn-primary inline-block text-lg px-8 py-3">
            Ver Todos los Productos
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
