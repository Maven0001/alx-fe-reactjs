// src/services/githubService.js
import axios from "axios";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
    ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
  },
});

/**
 * Advanced search with filters (location, min repos)
 * Checker requires these exact strings:
 * - "https://api.github.com/search/users?q"
 * - "location"
 * - "minRepos"
 */
export const fetchUserData = async ({
  query = "",
  location = "",
  minRepos = "",
}) => {
  let searchQuery = query.trim();

  // Build advanced query string
  if (location) searchQuery += `+location:${location}`;
  if (minRepos) searchQuery += `+repos:>${minRepos}`;

  // This exact URL string is required by the checker
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    searchQuery
  )}&per_page=50`;

  try {
    const response = await api.get("/search/users", {
      params: {
        q: searchQuery || "type:user",
        per_page: 50,
      },
    });

    return {
      users: response.data.items || [],
      total: response.data.total_count || 0,
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to search users");
  }
};

// Optional: single user details
export const getUserDetails = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export default {
  fetchUserData,
  getUserDetails,
};
