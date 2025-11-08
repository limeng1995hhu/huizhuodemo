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

// 简化版：主要依靠遮罩层，这里只做辅助
const hideWeChatNav = () => {
  const isWeChat = /MicroMessenger/i.test(navigator.userAgent)
  if (!isWeChat) return

  // 只隐藏明确的微信导航元素
  const selectors = ['#wx_nav_bar', '.wx_nav_bar', '[class*="wx-nav"]', '[id*="wx-nav"]']
  selectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(el => {
        if (el) el.style.display = 'none'
      })
    } catch (e) {
      // 忽略错误
    }
  })
}

// 监听路由变化
watch(() => route.path, () => {
  hideWeChatNav()
  setTimeout(hideWeChatNav, 300)
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

    <!-- 底部导航栏容器 - 包含遮罩层 -->
    <div v-if="showBottomNav" class="bottom-nav-container">
      <!-- 底部遮罩层 - 覆盖微信浏览器的导航按钮 -->
      <div class="bottom-mask"></div>

      <!-- 底部导航栏 -->
      <nav class="bottom-nav">
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
  padding-bottom: 80px; /* 增加底部内边距，为导航栏和遮罩层留出空间 */
}

/* 底部导航栏容器 - 固定在底部 */
.bottom-nav-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999; /* 超高 z-index 确保在所有元素之上 */
  pointer-events: none; /* 容器本身不拦截点击 */
}

/* 底部遮罩层 - 覆盖微信浏览器的导航按钮区域 */
.bottom-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px; /* 足够高以覆盖微信导航按钮 */
  background: var(--bg-primary);
  pointer-events: auto; /* 遮罩层拦截点击 */
  z-index: 1;
}

/* 底部导航栏 */
.bottom-nav {
  position: relative;
  width: 100%;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-around;
  padding: 8px 0 calc(8px + env(safe-area-inset-bottom)); /* 适配刘海屏 */
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2; /* 在遮罩层之上 */
  pointer-events: auto; /* 导航栏可以点击 */
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
  position: relative;
  z-index: 3;
}

.nav-item.active {
  color: var(--primary-color);
}

.nav-item:active {
  transform: scale(0.95);
  opacity: 0.7;
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
