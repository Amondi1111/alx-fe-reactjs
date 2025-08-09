import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [rawItems, setRawItems] = useState([]);

  const fetchUserData = async (pageNumber = 1, append = false) => {
    await doSearch({ page: pageNumber, append });
  };

  const doSearch = async ({ page: pageNumber, append }) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchUsers(query, pageNumber);
      setTotalCount(data.total_count);
      setRawItems((prev) => (append ? [...prev, ...data.items] : data.items));
      setResults((prev) =>
        append ? [...prev, ...data.items] : data.items
      );
      setPage(pageNumber);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    setResults([]);
    setRawItems([]);
    setTotalCount(0);
    await fetchUserData(1, false);
  };

  const handleLoadMore = async () => {
    const next = page + 1;
    await fetchUserData(next, true);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          placeholder="Search GitHub users..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <p>Total Results: {totalCount}</p>

      <ul>
        {results.map((user) => (
          <li key={user.id}>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              {user.login}
            </a>
          </li>
        ))}
      </ul>

      {results.length < totalCount && !loading && (
        <button onClick={handleLoadMore}>Load More</button>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Search;
