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
  // If path starts with /, remove the leading slash when baseURL is not empty
  const cleanPath = path.startsWith("/") && apiBaseUrl ? path.slice(1) : path;
  return apiBaseUrl ? `${apiBaseUrl}/${cleanPath}` : path;
};

export default apiClient;
