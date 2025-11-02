<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStats = ref({
  coins: 1280,
  level: '业余3段',
  winRate: 65,
  totalGames: 156
})

const learningModules = [
  {
    id: 1,
    title: 'AI对弈',
    icon: '🤖',
    color: '#4a90e2',
    path: '/learning/ai-game',
    description: '与AI切磋棋艺，提升实战能力',
    features: ['27个难度等级', '实时对弈', '复盘分析']
  },
  {
    id: 2,
    title: '人人对弈',
    icon: '👥',
    color: '#2c5f2d',
    path: '/learning/pvp-game',
    description: '在线匹配对手，实时对战',
    features: ['智能匹配', '计时对弈', '对战记录']
  },
  {
    id: 3,
    title: '围棋习题',
    icon: '📝',
    color: '#9c27b0',
    path: '/learning/practice',
    description: '海量题库，系统练习',
    features: ['6个难度等级', '错题集', '统计分析']
  },
  {
    id: 4,
    title: '教学视频',
    icon: '🎬',
    color: '#f44336',
    path: '/learning/videos',
    description: '名师讲解，系统学习',
    features: ['入门到高段', '专题讲座', '实战解析']
  }
]

const recentActivities = ref([
  {
    id: 1,
    type: 'ai-game',
    title: '与AI对弈',
    result: '胜',
    coins: 10,
    time: '2小时前'
  },
  {
    id: 2,
    type: 'practice',
    title: '完成死活题练习',
    result: '8/10',
    coins: 8,
    time: '5小时前'
  },
  {
    id: 3,
    type: 'pvp-game',
    title: '人人对弈',
    result: '负',
    coins: 5,
    time: '1天前'
  }
])

const goToModule = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="learning-page">
    <div class="container">
      <!-- 用户学习统计 -->
      <div class="stats-card card">
        <div class="stats-header">
          <h3>我的学习</h3>
          <div class="coins-display">
            <span class="coin-icon">🪙</span>
            <span class="coin-amount">{{ userStats.coins }}</span>
          </div>
        </div>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{ userStats.level }}</div>
            <div class="stat-label">当前等级</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ userStats.winRate }}%</div>
            <div class="stat-label">胜率</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ userStats.totalGames }}</div>
            <div class="stat-label">总对局</div>
          </div>
        </div>
      </div>

      <!-- 学习模块 -->
      <div class="modules-section">
        <h3 class="section-title">学习模块</h3>
        <div class="modules-grid">
          <div
            v-for="module in learningModules"
            :key="module.id"
            class="module-card"
            @click="goToModule(module.path)"
          >
            <div class="module-header">
              <div class="module-icon" :style="{ backgroundColor: module.color }">
                {{ module.icon }}
              </div>
              <h4 class="module-title">{{ module.title }}</h4>
            </div>
            <p class="module-description">{{ module.description }}</p>
            <div class="module-features">
              <span
                v-for="(feature, index) in module.features"
                :key="index"
                class="feature-tag"
              >
                {{ feature }}
              </span>
            </div>
            <button class="module-btn" :style="{ backgroundColor: module.color }">
              开始学习 →
            </button>
          </div>
        </div>
      </div>

      <!-- 最近活动 -->
      <div class="activities-section">
        <h3 class="section-title">最近活动</h3>
        <div class="activities-list">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="activity-item card"
          >
            <div class="activity-content">
              <div class="activity-title">{{ activity.title }}</div>
              <div class="activity-meta">
                <span class="activity-result">{{ activity.result }}</span>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
            <div class="activity-reward">
              <span class="coin-icon">🪙</span>
              <span class="coin-amount">+{{ activity.coins }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 虚拟币说明 -->
      <div class="info-card card">
        <h4>💡 虚拟币获取方式</h4>
        <ul class="info-list">
          <li>每日登录：+5 虚拟币</li>
          <li>完成对弈：+10 虚拟币</li>
          <li>完成习题：+1 虚拟币/题</li>
          <li>观看视频：+3 虚拟币/次</li>
        </ul>
        <p class="info-tip">虚拟币可在商城兑换围棋用品和文创周边</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.learning-page {
  padding: 20px 0;
  min-height: 100vh;
}

.stats-card {
  margin-bottom: 24px;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stats-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.coins-display {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}

.coin-icon {
  font-size: 20px;
}

.coin-amount {
  font-size: 18px;
  font-weight: 700;
  color: #8b4513;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: var(--bg-gray);
  border-radius: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.modules-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.module-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.module-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
}

.module-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.module-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.module-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.module-description {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.5;
}

.module-features {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
  flex: 1;
}

.feature-tag {
  font-size: 11px;
  padding: 4px 8px;
  background: var(--bg-gray);
  color: var(--text-secondary);
  border-radius: 4px;
}

.module-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.module-btn:hover {
  opacity: 0.9;
  transform: translateX(4px);
}

.activities-section {
  margin-bottom: 24px;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.activity-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
}

.activity-result {
  color: var(--primary-color);
  font-weight: 500;
}

.activity-time {
  color: var(--text-light);
}

.activity-reward {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--bg-gray);
  border-radius: 16px;
}

.activity-reward .coin-icon {
  font-size: 16px;
}

.activity-reward .coin-amount {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-color);
}

.info-card {
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border: none;
}

.info-card h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.info-list {
  list-style: none;
  padding: 0;
  margin-bottom: 12px;
}

.info-list li {
  padding: 6px 0;
  padding-left: 20px;
  position: relative;
  font-size: 14px;
  color: var(--text-secondary);
}

.info-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: bold;
}

.info-tip {
  font-size: 13px;
  color: var(--text-secondary);
  font-style: italic;
}

@media (max-width: 768px) {
  .modules-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    gap: 12px;
  }

  .stat-value {
    font-size: 20px;
  }
}
</style>

