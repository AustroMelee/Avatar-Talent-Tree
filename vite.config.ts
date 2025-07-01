import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Forcing the dev server to poll for file changes can resolve issues
    // where hot-reloading doesn't pick up modifications to data files like talent layouts.
    watch: {
      usePolling: true,
    }
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