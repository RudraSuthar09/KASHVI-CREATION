import axios from "axios";

// Get the backend URL from environment variable
// In development: defaults to empty string (uses Vite proxy)
// In production: should be set to the Render backend URL
export const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || "";

// Log configuration on startup (helps debug deployment issues)
if (import.meta.env.MODE === 'production' && !import.meta.env.VITE_BACKEND_URL) {
  console.error(
    '⚠️ CONFIGURATION ERROR: VITE_BACKEND_URL is not set!\n' +
    'The application will not work in production without this environment variable.\n' +
    'Please set VITE_BACKEND_URL=https://kashvi-creation-1.onrender.com in Vercel environment variables.'
  );
}

console.log('🔧 API Configuration:', {
  mode: import.meta.env.MODE,
  baseURL: apiBaseUrl || '(using relative URLs - proxy expected)',
  backendConfigured: !!import.meta.env.VITE_BACKEND_URL
});

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
