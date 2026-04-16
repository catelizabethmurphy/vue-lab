import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/vue-lab/',
  plugins: [vue()],
  build: {
    outDir: 'docs'
  }
})