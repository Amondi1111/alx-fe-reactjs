import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_API_KEY;

export async function fetchUserData(username) {

  const response = await fetch(`${BASE_URL}/${username}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    const message = `GitHub API error: ${response.status} ${response.statusText}`;
    console.error(message);
    throw new Error('User not found');
  }

  return await response.json();
}

