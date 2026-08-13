import React, { useState } from 'react';

function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar ciudad... (ej: Madrid, Paris, Tokyo)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        className="search-input"
      />
      <button type="submit" disabled={loading} className="search-button">
        {loading ? '⏳' : '🔍'}
      </button>
    </form>
  );
}

export default SearchBar;
