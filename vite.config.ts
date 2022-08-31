import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const plugins = { plugins: [vue()] }
  switch (mode) {
    case 'production':
      plugins.plugins.push(splitVendorChunkPlugin())
      return Object.assign(plugins, { base: '/todo-list/', })
    case 'test':
      return Object.assign(plugins, {
        test: {
          globals: true,
          setupFiles: 'src/setupTest.ts',
          include: ['**/*.test.ts'],
          environment: 'jsdom'
        }
      })
    default:
      return Object.assign(plugins, {})
  }
})