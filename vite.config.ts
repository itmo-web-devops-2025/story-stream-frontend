import react from '@vitejs/plugin-react'
import * as path from 'node:path'
import { defineConfig } from 'vitest/config'
import { version } from './package.json'

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version)
  },
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
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        'src/main.tsx',
        'src/**/*.d.ts',
        'src/types/**',
        'src/enum/**',
        'src/constants/**',
        'src/config/**',
        '**/*.test.{ts,tsx}',
        '**/*.module.css',
        '**/*.type.ts',
        '**/*.constant.ts',
        '**/*.router.tsx'
      ],
      reporter: ['text', 'lcov'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  }
})
