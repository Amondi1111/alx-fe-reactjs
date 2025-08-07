import axios from 'axios';

const fetchGithubUser = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return await response.json();
};

export default fetchGithubUser;
