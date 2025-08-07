import React, { useState } from 'react';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(false);
    setUserData(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      {error && <p>Looks like we can't find the user</p>}

      {userData && (
        <div className="user-result">
          <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} width={100} />
          <p>{userData.login}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
