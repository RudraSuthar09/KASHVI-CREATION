import axios from "axios";

// Get the backend URL from environment variable
// In development: defaults to empty string (uses Vite proxy)
// In production: should be set to the Render backend URL
export const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || "";

// Create axios instance with default configuration
export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to build full URL for fetch requests
export const buildApiUrl = (path) => {
  // If no baseURL, return path as-is (uses proxy in dev)
  if (!apiBaseUrl) return path;
  
  // Remove trailing slash from baseURL and leading slash from path
  const cleanBaseUrl = apiBaseUrl.replace(/\/$/, '');
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  return `${cleanBaseUrl}/${cleanPath}`;
};

export default apiClient;
