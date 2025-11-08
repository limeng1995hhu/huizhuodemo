import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pages 部署配置
  // 部署到 https://limeng1995hhu.github.io/huizhuodemo/
  base: process.env.NODE_ENV === 'production' ? '/huizhuodemo/' : '/',
})
