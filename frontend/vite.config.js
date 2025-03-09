import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:4000/api/v1', // URL of your PHP backend
        // target: 'https://erp-api-tawny.vercel.app/api/v1', // Vercel Backend End Point
        target: 'https://erp-p0wm.onrender.com/api/v1', // Render backend endpoint URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    historyApiFallback: true,
  },
});
