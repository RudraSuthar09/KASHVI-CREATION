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
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Updated backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
