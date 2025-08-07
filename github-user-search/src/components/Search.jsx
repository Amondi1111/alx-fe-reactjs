import React, { useState } from 'react';
import fetchGithubUser from '../services/githubService';


export default function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const users = await githubService.advancedSearch({ username, location, minRepos });
      setResults(users);
    } catch (err) {
      setError('Failed to fetch users.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSearch} className="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Advanced GitHub User Search</h2>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered flex-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="input input-bordered flex-1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="number"
            placeholder="Minimum Repositories"
            className="input input-bordered flex-1"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-4">
        {results.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow">
            <div className="flex items-center space-x-4">
              <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
              <div>
                <a href={user.html_url} target="_blank" rel="noreferrer" className="text-lg font-semibold text-blue-600">{user.login}</a>
                <p>Location: {user.location || 'N/A'}</p>
                <p>Repos: {user.public_repos ?? 'N/A'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
