import React, { useState } from 'react';

function Search({ onSearch }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userFound = await onSearch(username);

    if (!userFound) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search GitHub username..."
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>Looks like we can't find the user</p>}
    </div>
  );
}

export default Search;
