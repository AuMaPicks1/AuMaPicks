import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';

function Navbar() {
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-green-600">AuMaPicks</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-green-600 transition">
              Inicio
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-green-600 transition">
              Productos
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-green-600 transition">
              Carrito
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="text-gray-600 hover:text-green-600 transition">
                  👤 {user.name}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition invisible group-hover:visible">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-t-lg"
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                  >
                    Mis Órdenes
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                    >
                      Panel Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 rounded-b-lg"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  Entrar
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-600 hover:text-green-600"
            >
              Inicio
            </Link>
            <Link
              to="/products"
              className="block px-4 py-2 text-gray-600 hover:text-green-600"
            >
              Productos
            </Link>
            <Link
              to="/cart"
              className="block px-4 py-2 text-gray-600 hover:text-green-600"
            >
              Carrito ({items.length})
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
