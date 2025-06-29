import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'

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
    force: true,
    include: [],
    exclude: []
  },
  resolve: {
    alias: {
      '@/styles': fileURLToPath(new URL('./styles', import.meta.url)),
    },
  }
}) 