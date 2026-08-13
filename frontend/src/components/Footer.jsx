import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Sobre Nosotros */}
          <div>
            <h3 className="text-xl font-bold mb-4">AuMaPicks</h3>
            <p className="text-gray-400">
              Tu tienda online de confianza para productos de limpieza de calidad para el hogar.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-green-400 transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-green-400 transition">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-green-400 transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@aupicks.com</li>
              <li>📱 +1 (555) 123-4567</li>
              <li>📍 Ciudad, País</li>
            </ul>
          </div>
        </div>

        {/* Línea divisora */}
        <hr className="border-gray-700 mb-8" />

        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>&copy; {currentYear} AuMaPicks. Todos los derechos reservados.</p>
          <p className="text-sm mt-2">Desarrollado con ❤️ por AuMaPicks1</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
