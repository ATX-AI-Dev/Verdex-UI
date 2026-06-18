import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// On pointe vers les sources des paquets workspace pour itérer sans build préalable.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@verdex/vue': fileURLToPath(new URL('../../packages/vue/src/index.ts', import.meta.url)),
      '@verdex/tokens': fileURLToPath(
        new URL('../../packages/tokens/src/index.css', import.meta.url),
      ),
    },
  },
})
