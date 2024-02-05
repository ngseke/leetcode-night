import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react() as any],
  test: {
    setupFiles: [
      './__tests__/setup.ts',
    ],
    globals: true,
    environment: 'jsdom',
    testTimeout: 30000,
    sequence: {
      hooks: 'list',
    },
  },
})
