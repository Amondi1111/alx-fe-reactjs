// src/App.jsx
import { useState } from 'react';
import './App.css';
import { fetchGitHubUser } from './services/githubService';

function App() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await fetchGitHubUser(username);
      console.log('Fetched data:', data);
      setUser(data);
    } catch (err) {
      console.error('Error during fetch:', err);
      setUser(null);
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {user && (
        <div className="user-card">
          <img src={user.avatar_url} alt="Avatar" width="100" />
          <h2>{user.name}</h2>
          <p>@{user.login}</p>
          <a href={user.html_url} target="_blank">View Profile</a>
        </div>
      )}
    </div>
  );
}

export default App;
