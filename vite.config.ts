/// <reference types="vitest">
/// <reference types="vite/client">
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    'include': ['**/*.test.ts'],
    'environment': 'jsdom'
  }
})
