import react from '@vitejs/plugin-react'
import * as path from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.VITE_SERVER_PORT) || 3000
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
