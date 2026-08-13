import React, { useState } from 'react';
import './JokeGenerator.css';

function JokeGenerator() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jokeType, setJokeType] = useState('general');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteJokes');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  // Fetch chiste de la API
  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = 'https://api.jokes.one/jokes/random';
      
      if (jokeType === 'programming') {
        url = 'https://official-joke-api.appspot.com/jokes/programming/random';
      } else if (jokeType === 'general') {
        url = 'https://official-joke-api.appspot.com/jokes/random';
      } else if (jokeType === 'knock-knock') {
        url = 'https://official-joke-api.appspot.com/jokes/knock-knock/random';
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener el chiste');
      
      const data = await response.json();
      
      // Formatear el chiste según la API
      let formattedJoke;
      if (data.contents) {
        formattedJoke = {
          setup: data.contents.jokes[0].joke,
          punchline: '',
          id: Date.now(),
          type: jokeType
        };
      } else {
        formattedJoke = {
          setup: data.setup || data.joke,
          punchline: data.punchline || '',
          id: Date.now(),
          type: jokeType
        };
      }
      
      setJoke(formattedJoke);
    } catch (err) {
      setError('No se pudo obtener el chiste. Intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Agregar a favoritos
  const addToFavorites = () => {
    if (joke && !favorites.some(fav => fav.id === joke.id)) {
      const updatedFavorites = [...favorites, joke];
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteJokes', JSON.stringify(updatedFavorites));
    }
  };

  // Eliminar de favoritos
  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteJokes', JSON.stringify(updatedFavorites));
  };

  // Limpiar favoritos
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favoriteJokes');
  };

  const isFavorited = joke && favorites.some(fav => fav.id === joke.id);

  return (
    <div className="joke-generator-container">
      <div className="joke-generator">
        <h1>😂 Generador de Chistes</h1>
        <p className="subtitle">Obtén un chiste aleatorio para reír</p>

        {/* Selector de tipo de chiste */}
        <div className="joke-type-selector">
          <label htmlFor="jokeType">Tipo de chiste:</label>
          <select 
            id="jokeType"
            value={jokeType} 
            onChange={(e) => setJokeType(e.target.value)}
            className="select-input"
          >
            <option value="general">General</option>
            <option value="programming">Programación</option>
            <option value="knock-knock">Toc Toc</option>
          </select>
        </div>

        {/* Área de visualización del chiste */}
        <div className="joke-display">
          {loading ? (
            <div className="loading">
              <span className="spinner"></span>
              <p>Buscando un chiste divertido...</p>
            </div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : joke ? (
            <div className="joke-content fade-in">
              <p className="joke-setup">{joke.setup}</p>
              {joke.punchline && (
                <p className="joke-punchline">{joke.punchline}</p>
              )}
            </div>
          ) : (
            <div className="empty-state">
              <p>Haz clic en "Obtener Chiste" para comenzar 🎉</p>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="button-group">
          <button 
            onClick={fetchJoke} 
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Cargando...' : '🎲 Obtener Chiste'}
          </button>
          
          {joke && (
            <button 
              onClick={addToFavorites}
              disabled={isFavorited}
              className={`btn ${isFavorited ? 'btn-disabled' : 'btn-secondary'}`}
            >
              {isFavorited ? '❤️ Favorito' : '🤍 Agregar a Favoritos'}
            </button>
          )}
          
          <button 
            onClick={() => setShowFavorites(!showFavorites)}
            className="btn btn-outline"
          >
            ⭐ Favoritos ({favorites.length})
          </button>
        </div>

        {/* Sección de Favoritos */}
        {showFavorites && (
          <div className="favorites-section fade-in">
            <div className="favorites-header">
              <h2>Mis Chistes Favoritos</h2>
              {favorites.length > 0 && (
                <button 
                  onClick={clearFavorites}
                  className="btn btn-danger-small"
                >
                  🗑️ Limpiar todos
                </button>
              )}
            </div>

            {favorites.length === 0 ? (
              <p className="empty-favorites">No tienes chistes favoritos aún</p>
            ) : (
              <div className="favorites-list">
                {favorites.map((fav, index) => (
                  <div key={fav.id} className="favorite-item">
                    <div className="favorite-content">
                      <span className="favorite-number">#{index + 1}</span>
                      <p className="favorite-setup">{fav.setup}</p>
                      {fav.punchline && (
                        <p className="favorite-punchline">{fav.punchline}</p>
                      )}
                      <span className="favorite-type">{fav.type}</span>
                    </div>
                    <button
                      onClick={() => removeFromFavorites(fav.id)}
                      className="btn-remove"
                      title="Eliminar de favoritos"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default JokeGenerator;
