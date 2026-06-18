import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'VerdexVue',
      fileName: 'verdex-vue',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // Vue reste externe : fourni par le projet consommateur.
      external: ['vue'],
      output: {
        exports: 'named',
        globals: { vue: 'Vue' },
        assetFileNames: 'verdex-vue.[ext]',
      },
    },
    cssCodeSplit: false,
  },
})
