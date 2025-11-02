<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userInfo = ref({
  avatar: '👤',
  nickname: '围棋爱好者',
  level: '业余3段',
  identity: '普通棋手',
  coins: 1280,
  phone: '138****5678'
})

const stats = ref([
  { label: '对局数', value: 156, icon: '🎮' },
  { label: '胜率', value: '65%', icon: '🏆' },
  { label: '做题数', value: 1250, icon: '📝' },
  { label: '学习时长', value: '128h', icon: '⏱️' }
])

const menuItems = [
  {
    section: '我的活动',
    items: [
      { icon: '🏆', label: '我的赛事', path: '/events', badge: 2 },
      { icon: '📚', label: '学习记录', path: '/learning' },
      { icon: '🛒', label: '我的订单', path: '/orders', badge: 1 }
    ]
  },
  {
    section: '设置',
    items: [
      { icon: '👤', label: '个人信息', action: 'editProfile' },
      { icon: '🔔', label: '消息通知', action: 'notifications' },
      { icon: '❓', label: '帮助中心', action: 'help' },
      { icon: '📞', label: '联系客服', action: 'contact' }
    ]
  }
]

const goTo = (path) => {
  if (path) {
    router.push(path)
  }
}

const handleAction = (action) => {
  alert(`功能：${action}`)
}

const logout = () => {
  if (confirm('确定要退出登录吗？')) {
    router.push('/login')
  }
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="user-info">
        <div class="avatar">{{ userInfo.avatar }}</div>
        <div class="info">
          <h2 class="nickname">{{ userInfo.nickname }}</h2>
          <div class="meta">
            <span class="level">{{ userInfo.level }}</span>
            <span class="identity">{{ userInfo.identity }}</span>
          </div>
        </div>
      </div>
      <div class="coins-card">
        <div class="coins-icon">🪙</div>
        <div class="coins-info">
          <div class="coins-amount">{{ userInfo.coins }}</div>
          <div class="coins-label">虚拟币</div>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- 数据统计 -->
      <div class="stats-section card">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- 菜单列表 -->
      <div v-for="menu in menuItems" :key="menu.section" class="menu-section">
        <h3 class="section-title">{{ menu.section }}</h3>
        <div class="menu-card card">
          <div
            v-for="item in menu.items"
            :key="item.label"
            class="menu-item"
            @click="item.path ? goTo(item.path) : handleAction(item.action)"
          >
            <div class="menu-left">
              <span class="menu-icon">{{ item.icon }}</span>
              <span class="menu-label">{{ item.label }}</span>
            </div>
            <div class="menu-right">
              <span v-if="item.badge" class="badge">{{ item.badge }}</span>
              <span class="arrow">→</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 退出登录 -->
      <button class="logout-btn" @click="logout">
        退出登录
      </button>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  padding-bottom: 20px;
  min-height: 100vh;
}

.profile-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  padding: 40px 16px 24px;
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.info {
  flex: 1;
}

.nickname {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
}

.meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
}

.level,
.identity {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.coins-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.coins-icon {
  font-size: 32px;
}

.coins-info {
  flex: 1;
}

.coins-amount {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 2px;
}

.coins-label {
  font-size: 12px;
  opacity: 0.9;
}

.stats-section {
  margin: -20px 16px 20px;
  position: relative;
  z-index: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-item {
  text-align: center;
}

.stat-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.menu-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
  padding: 0 4px;
}

.menu-card {
  padding: 0;
  overflow: hidden;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.menu-item:not(:last-child) {
  border-bottom: 1px solid var(--border-color);
}

.menu-item:hover {
  background: var(--bg-gray);
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-icon {
  font-size: 20px;
}

.menu-label {
  font-size: 15px;
  color: var(--text-primary);
}

.menu-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  background: var(--secondary-color);
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.arrow {
  color: var(--text-light);
  font-size: 16px;
}

.logout-btn {
  width: 100%;
  padding: 14px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.logout-btn:hover {
  background: var(--bg-gray);
  border-color: var(--text-secondary);
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .stats-grid {
    gap: 12px;
  }

  .stat-icon {
    font-size: 20px;
  }

  .stat-value {
    font-size: 16px;
  }
}
</style>

