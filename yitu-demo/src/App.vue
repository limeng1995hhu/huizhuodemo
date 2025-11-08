<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isLoggedIn = ref(false)

const showBottomNav = computed(() => {
  const hideNavRoutes = ['/login']
  return !hideNavRoutes.includes(route.path)
})

const navItems = [
  { name: '首页', path: '/', icon: '🏠' },
  { name: '赛事', path: '/events', icon: '🏆' },
  { name: '发现', path: '/news', icon: '📰' },
  { name: '商城', path: '/shop', icon: '🛒' },
  { name: '我的', path: '/profile', icon: '👤' }
]

const goToProfile = () => {
  if (isLoggedIn.value) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}

// 隐藏微信浏览器导航按钮的函数
const hideWeChatNav = () => {
  const isWeChat = /MicroMessenger/i.test(navigator.userAgent)
  if (!isWeChat) return

  // 查找并隐藏所有可能的导航按钮
  const hideElements = () => {
    const selectors = [
      'body > div:not(#app)',
      'body > button:not(.user-btn):not(.el-button)',
      'body > nav:not(.bottom-nav)',
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

    // 隐藏包含箭头符号的按钮
    document.querySelectorAll('button, a, div[role="button"]').forEach(btn => {
      const text = btn.textContent.trim()
      if ((text === '<' || text === '>' || text === '←' || text === '→') && !btn.closest('#app')) {
        btn.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important;'
      }
    })
  }

  hideElements()
  setTimeout(hideElements, 100)
  setTimeout(hideElements, 300)
  setTimeout(hideElements, 500)
}

// 监听路由变化
watch(() => route.path, () => {
  // 路由切换时立即隐藏导航按钮
  hideWeChatNav()
  // 延迟再次隐藏（因为微信浏览器可能在动画后显示）
  setTimeout(hideWeChatNav, 100)
  setTimeout(hideWeChatNav, 300)
  setTimeout(hideWeChatNav, 500)
  setTimeout(hideWeChatNav, 1000)
})

// 组件挂载时执行
onMounted(() => {
  hideWeChatNav()
})
</script>

<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">弈途</div>
        <div class="header-right">
          <button class="user-btn" @click="goToProfile">
            {{ isLoggedIn ? '👤 我的' : '登录' }}
          </button>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 底部导航栏 -->
    <nav v-if="showBottomNav" class="bottom-nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: route.path === item.path }"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.name }}</span>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--primary-color);
  color: white;
  box-shadow: var(--shadow);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 2px;
}

.user-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.user-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.main-content {
  flex: 1;
  min-height: calc(100vh - 120px);
  padding-bottom: 70px;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 12px;
  text-decoration: none;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  flex: 1;
}

.nav-item.active {
  color: var(--primary-color);
}

.nav-icon {
  font-size: 24px;
  margin-bottom: 2px;
}

.nav-label {
  font-size: 12px;
}

@media (max-width: 768px) {
  .logo {
    font-size: 18px;
  }

  .nav-icon {
    font-size: 20px;
  }

  .nav-label {
    font-size: 11px;
  }
}
</style>

<style>
/* 隐藏可能的浏览器导航按钮 */
body {
  overflow-x: hidden;
}

/* 隐藏微信浏览器等移动端浏览器的前进后退按钮 */
#app {
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

/* 防止出现水平滚动条和导航按钮 */
html, body {
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

/* 隐藏可能的浏览器控制按钮 */
button[aria-label*="前进"],
button[aria-label*="后退"],
button[aria-label*="Previous"],
button[aria-label*="Next"] {
  display: none !important;
}
</style>
