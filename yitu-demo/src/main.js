import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 简化的微信浏览器导航按钮隐藏功能
// 现在主要依靠遮罩层来覆盖，JavaScript 只做辅助
function hideWeChatNavigation() {
  const isWeChat = /MicroMessenger/i.test(navigator.userAgent)

  if (isWeChat) {
    console.log('检测到微信浏览器，使用遮罩层覆盖导航按钮')

    const hideElements = () => {
      // 只隐藏明确的微信导航元素
      const selectors = [
        '#wx_nav_bar',
        '.wx_nav_bar',
        '[class*="wx-nav"]',
        '[id*="wx-nav"]'
      ]

      selectors.forEach(selector => {
        try {
          document.querySelectorAll(selector).forEach(el => {
            if (el && el.id !== 'app') {
              el.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important;'
            }
          })
        } catch (e) {
          // 忽略错误
        }
      })
    }

    // 页面加载后执行
    hideElements()

    // 使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver(hideElements)
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // 定期检查
    setInterval(hideElements, 500)
  }
}

// 在 DOM 加载完成后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideWeChatNavigation)
} else {
  hideWeChatNavigation()
}

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(ElementPlus).mount('#app')

// 挂载后再次执行隐藏
setTimeout(hideWeChatNavigation, 100)
