import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    target: 'esnext',
    outDir: 'dist'
  },
  // Add file change debouncing to prevent rapid refreshes
  optimizeDeps: {
    include: [],
    exclude: []
  }
}) 