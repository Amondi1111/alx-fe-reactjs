import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN || null;

const axiosInstance = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: TOKEN
    ? {
        Authorization: `token ${TOKEN}`,
      }
    : {},
});

function buildQuery({ username, location, minRepos }) {
  const parts = [];

  if (username && username.trim()) {
    
    parts.push(`${username.trim()} in:login`);
  }

  if (location && location.trim()) {
    parts.push(`location:${location.trim()}`);
  }

  if (minRepos) {
    const n = Number(minRepos);
    if (!Number.isNaN(n) && n >= 0) {
      parts.push(`repos:>=${n}`);
    }
  }


  if (parts.length === 0) parts.push('followers:>0');

  return parts.join(' ');
}


export async function searchUsers({ username, location, minRepos, page = 1, per_page = 10 } = {}) {
  const q = buildQuery({ username, location, minRepos });
  const url = `/search/users?q=${encodeURIComponent(q)}&page=${page}&per_page=${per_page}`;

  const res = await axiosInstance.get(url);
  return res.data;
}

export async function fetchUserDetails(login) {
  const res = await axiosInstance.get(`/users/${encodeURIComponent(login)}`);
  return res.data; 
}


export async function enrichUsersWithDetails(userItems = [], limit = 10) {
  const slice = userItems.slice(0, limit);
  
  const promises = slice.map((u) =>
    fetchUserDetails(u.login)
      .then((full) => full)
      .catch(() => ({ login: u.login, error: true }))
  );
  const details = await Promise.all(promises);
  
  return details;
}

export default {
  searchUsers,
  fetchUserDetails,
  enrichUsersWithDetails,
};
