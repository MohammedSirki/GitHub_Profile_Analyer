import axios from "axios";

const githubAPI = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

const getGithubUser = async (username) => {
  const response = await githubAPI.get(`/users/${username}`);
  return response.data;
};

const getGithubRepos = async (username) => {
  const response = await githubAPI.get(`/users/${username}/repos?per_page=100`);
  return response.data;
};

export { getGithubUser, getGithubRepos };
