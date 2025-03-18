import react from '@vitejs/plugin-react'
import * as path from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.VITE_SERVER_PORT) || 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true, // Нужно для корректной подмены заголовков Origin
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') // Убираем /api
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
