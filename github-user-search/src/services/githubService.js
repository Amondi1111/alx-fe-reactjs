import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_API_KEY;

export const fetchGitHubUser = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/${username}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('GitHub API:', error);
    throw error;
  }
};
