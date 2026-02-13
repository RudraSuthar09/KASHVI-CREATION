import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173, // Change if needed
    // Only use proxy if VITE_BACKEND_URL is not set (for local development)
    // In production (Vercel), VITE_BACKEND_URL will be set, so proxy is skipped
    proxy: process.env.VITE_BACKEND_URL ? {} : {
      "/api": {
        target: "http://localhost:5000", // Backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
