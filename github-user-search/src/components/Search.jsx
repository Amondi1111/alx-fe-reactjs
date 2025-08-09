import React, { useState } from 'react';
import githubService from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]); 
  const [rawItems, setRawItems] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(6); 
  const [totalCount, setTotalCount] = useState(0);

  const doSearch = async (opts = { page: 1, append: false }) => {
    const { page: p, append } = opts;
    setLoading(true);
    setError(null);

    try {
      const { total_count, items } = await githubService.searchUsers({
        username,
        location,
        minRepos,
        page: p,
        per_page: perPage,
      });

      setTotalCount(total_count);

      if (!items || items.length === 0) {
        if (!append) {
          setResults([]);
          setRawItems([]);
          setError("Looks like we cant find the user");
        }
        setLoading(false);
        return;
      }

      const details = await githubService.enrichUsersWithDetails(items, perPage);

      if (append) {
        setResults((prev) => [...prev, ...details]);
        setRawItems((prev) => [...prev, ...items]);
      } else {
        setResults(details);
        setRawItems(items);
      }

      setPage(p);
    } catch (err) {
      console.error(err);
      setError("Looks like we cant find the user");
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    setResults([]);
    setRawItems([]);
    setTotalCount(0);
    await doSearch({ page: 1, append: false });
  };

  const handleLoadMore = async () => {
    const next = page + 1;
    await doSearch({ page: next, append: true });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Advanced GitHub User Search</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            aria-label="Username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            aria-label="Location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            aria-label="Minimum repositories"
            placeholder="Min repos"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            min="0"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading...</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((user) => (
              <div key={user.login} className="border rounded-md p-4 flex items-center gap-4 bg-white">
                <img
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-indigo-700 hover:underline"
                  >
                    {user.name || user.login}
                  </a>
                  <p className="text-sm text-gray-600">{user.login}</p>
                  <p className="text-sm">Location: {user.location || 'N/A'}</p>
                  <p className="text-sm">Public repos: {user.public_repos ?? 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>

    
          {results.length > 0 && rawItems.length < totalCount && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
