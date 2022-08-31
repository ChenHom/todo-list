import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/todo-list/',
  plugins: [vue()],
  test: {
    globals: true,
    setupFiles: 'src/setupTest.ts',
    include: ['**/*.test.ts'],
    environment: 'jsdom'
  }
})
