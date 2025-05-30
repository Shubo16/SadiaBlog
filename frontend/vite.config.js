import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-icons']
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend URL
        changeOrigin: true,
      },
    },
  },
  base: process.env.VITE_BASE_PATH || "/"
})
