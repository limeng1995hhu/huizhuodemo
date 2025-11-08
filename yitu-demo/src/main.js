import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 检测并隐藏微信浏览器的导航按钮
function hideWeChatNavigation() {
  // 检测是否在微信浏览器中
  const isWeChat = /MicroMessenger/i.test(navigator.userAgent)

  if (isWeChat) {
    // 尝试隐藏微信浏览器的导航栏
    const hideElements = () => {
      // 查找所有可能的微信导航元素
      const selectors = [
        '#wx_nav_bar',
        '.wx_nav_bar',
        '[class*="wx-nav"]',
        '[id*="wx-nav"]',
        '[class*="wechat-nav"]',
        '[id*="wechat-nav"]',
        'body > div:not(#app)',
        'body > button'
      ]

      selectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector)
          elements.forEach(el => {
            if (el && el.id !== 'app') {
              el.style.display = 'none'
              el.style.visibility = 'hidden'
              el.style.opacity = '0'
              el.style.height = '0'
              el.style.pointerEvents = 'none'
            }
          })
        } catch (e) {
          console.log('隐藏元素失败:', e)
        }
      })
    }

    // 页面加载后立即执行
    hideElements()

    // 使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver(() => {
      hideElements()
    })

    // 开始观察
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // 定期检查（作为备用方案）
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
