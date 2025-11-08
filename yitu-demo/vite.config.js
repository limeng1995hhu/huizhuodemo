import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Gzip 压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 大于 10KB 的文件才压缩
      algorithm: 'gzip',
      ext: '.gz',
    })
  ],
  // GitHub Pages 部署配置
  // 部署到 https://limeng1995hhu.github.io/huizhuodemo/
  base: process.env.NODE_ENV === 'production' ? '/huizhuodemo/' : '/',

  // 构建优化
  build: {
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 构建后是否生成 source map 文件
    sourcemap: false,
    // chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 1000,
    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境移除 console
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Rollup 打包配置
    rollupOptions: {
      output: {
        // 静态资源分类打包
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        // 代码分割
        manualChunks: {
          // 将 Vue 相关库打包到一起
          'vue-vendor': ['vue', 'vue-router'],
          // 将 Element Plus 单独打包
          'element-plus': ['element-plus', '@element-plus/icons-vue'],
        },
      },
    },
    // 关闭 brotli 压缩大小报告，提升构建速度
    reportCompressedSize: false,
  },

  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router', 'element-plus', '@element-plus/icons-vue'],
  },
})
