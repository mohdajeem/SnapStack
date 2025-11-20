import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  // Dev proxy to avoid CORS when running the client locally.
  // Requests to /api/* will be proxied to the deployed API during development.
  server: {
    proxy: {
      '/api': {
        target: 'https://tit8lyoqmk.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
