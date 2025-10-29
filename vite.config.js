import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/raiatea-bungalow/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'landing.html'),
        pool: resolve(__dirname, 'bungalow-with-pool.html'),
        standard: resolve(__dirname, 'bungalow.html')
      }
    }
  },
  server: {
    host: true,
    port: 5173
  }
})