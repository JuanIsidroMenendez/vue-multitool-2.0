import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api-tiempo': {
        target: 'https://www.el-tiempo.net',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-tiempo/, '/api/json/v2'),
        headers: {
          'Referer': 'https://www.el-tiempo.net/',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    }
  }
})