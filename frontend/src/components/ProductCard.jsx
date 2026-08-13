import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const priceWithDiscount = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="card overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      {/* Imagen */}
      <div className="relative overflow-hidden bg-gray-200 h-48 cursor-pointer group">
        <img
          src={product.image || 'https://via.placeholder.com/200'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition"
          onClick={() => navigate(`/products/${product._id}`)}
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3
          className="font-semibold text-lg mb-2 cursor-pointer hover:text-green-600 transition"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          {product.name}
        </h3>

        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 text-sm text-gray-600">
            {product.rating?.toFixed(1) || 0} ({product.reviews || 0})
          </span>
        </div>

        {/* Precio */}
        <div className="mb-4">
          {product.discount > 0 ? (
            <>
              <span className="text-gray-400 line-through text-sm">${product.price.toFixed(2)}</span>
              <span className="text-xl font-bold text-green-600 ml-2">
                ${priceWithDiscount.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
          )}
        </div>

        {/* Stock */}
        <p className="text-sm mb-4">
          {product.stock > 0 ? (
            <span className="text-green-600 font-semibold">En stock ({product.stock})</span>
          ) : (
            <span className="text-red-600 font-semibold">Agotado</span>
          )}
        </p>

        {/* Botones */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate(`/products/${product._id}`)}
            className="btn btn-outline text-sm"
          >
            Ver Detalles
          </button>
          <button
            onClick={() => addItem(product, 1)}
            disabled={product.stock === 0}
            className="btn btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
