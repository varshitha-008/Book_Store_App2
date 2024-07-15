import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
    // Implement search functionality here
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="button">Search</button>
    </div>
  );
};


export default SearchBar;
