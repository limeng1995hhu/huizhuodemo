<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

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
</script>

<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">弈途</div>
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
  justify-content: center;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 2px;
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
