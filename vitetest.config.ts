import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/__tests__/**',
        '**/vite-env.d.ts',
        '**/vite.config.*',
        '**/vitest.config.*',
        'src/main.tsx',
        'src/App.tsx',
        'tests/setup.ts',
      ],
      thresholds: {
        functions: 95,
        branches: 95,
        statements: 95,
        lines: 95,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
