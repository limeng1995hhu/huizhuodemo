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
    console.log('检测到微信浏览器，启动导航按钮隐藏功能')

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
        'body > button:not(.user-btn):not(.el-button)',
        'body > nav:not(.bottom-nav)'
      ]

      selectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector)
          elements.forEach(el => {
            if (el && el.id !== 'app' && !el.classList.contains('bottom-nav')) {
              el.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; width: 0 !important; pointer-events: none !important; position: absolute !important; z-index: -9999 !important;'
            }
          })
        } catch (e) {
          // 忽略错误
        }
      })

      // 特别处理：查找所有包含 < 或 > 文本的按钮
      const allButtons = document.querySelectorAll('button, a, div[role="button"]')
      allButtons.forEach(btn => {
        const text = btn.textContent.trim()
        if ((text === '<' || text === '>' || text === '←' || text === '→') &&
            !btn.closest('#app')) {
          btn.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; width: 0 !important; pointer-events: none !important; position: absolute !important; z-index: -9999 !important;'
        }
      })
    }

    // 页面加载后立即执行
    hideElements()

    // 使用 MutationObserver 监听 DOM 变化（更频繁）
    const observer = new MutationObserver(() => {
      hideElements()
    })

    // 开始观察整个文档
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    })

    // 监听路由变化
    window.addEventListener('hashchange', hideElements)
    window.addEventListener('popstate', hideElements)

    // 监听滚动事件（微信浏览器在滚动时可能显示导航）
    let scrollTimer = null
    window.addEventListener('scroll', () => {
      hideElements()
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(hideElements, 100)
    }, { passive: true })

    // 监听触摸事件
    window.addEventListener('touchstart', hideElements, { passive: true })
    window.addEventListener('touchmove', hideElements, { passive: true })
    window.addEventListener('touchend', () => {
      hideElements()
      setTimeout(hideElements, 100)
      setTimeout(hideElements, 300)
      setTimeout(hideElements, 500)
    }, { passive: true })

    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        hideElements()
        setTimeout(hideElements, 100)
        setTimeout(hideElements, 300)
      }
    })

    // 定期检查（更频繁）
    setInterval(hideElements, 200)

    // 额外的延迟检查
    setTimeout(hideElements, 500)
    setTimeout(hideElements, 1000)
    setTimeout(hideElements, 2000)
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
