import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Backend server
        secure: false,  // Disable SSL verification if the backend is using HTTPS without a valid certificate
        changeOrigin: true, // Change the origin of the request to the target URL
      },
    },
  },
  plugins: [react()],
})
