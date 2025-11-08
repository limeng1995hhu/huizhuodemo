import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pages 部署配置
  // 部署到 https://limeng1995hhu.github.io/huizhuodemo/
  base: process.env.NODE_ENV === 'production' ? '/huizhuodemo/' : '/',
  build: {
    // 添加哈希值到文件名，强制刷新缓存
    rollupOptions: {
      output: {
        // 为每个 chunk 添加哈希值
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
})
