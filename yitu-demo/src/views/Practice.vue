<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedDifficulty = ref('初级')
const selectedType = ref('死活题')

const difficulties = ['入门', '初级', '中级', '高级', '低段', '高段']
const types = ['死活题', '定式题', '手筋题', '布局题']

const stats = ref({
  total: 1250,
  correct: 856,
  accuracy: 68
})

const goBack = () => {
  router.back()
}

const startPractice = () => {
  alert('开始练习！（实际项目中会加载题目）')
}
</script>

<template>
  <div class="practice-page">
    <div class="container">
      <button class="back-btn" @click="goBack">← 返回</button>
      
      <h1 class="page-title">围棋习题</h1>

      <!-- 统计卡片 -->
      <div class="stats-card card">
        <div class="stat-item">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">已做题数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.correct }}</div>
          <div class="stat-label">正确题数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.accuracy }}%</div>
          <div class="stat-label">正确率</div>
        </div>
      </div>

      <!-- 题目类型选择 -->
      <div class="selection-section card">
        <h3>题目类型</h3>
        <div class="type-grid">
          <button
            v-for="type in types"
            :key="type"
            class="type-btn"
            :class="{ active: selectedType === type }"
            @click="selectedType = type"
          >
            {{ type }}
          </button>
        </div>
      </div>

      <!-- 难度选择 -->
      <div class="selection-section card">
        <h3>难度等级</h3>
        <div class="difficulty-grid">
          <button
            v-for="difficulty in difficulties"
            :key="difficulty"
            class="difficulty-btn"
            :class="{ active: selectedDifficulty === difficulty }"
            @click="selectedDifficulty = difficulty"
          >
            {{ difficulty }}
          </button>
        </div>
      </div>

      <!-- 开始按钮 -->
      <button class="start-btn btn-primary" @click="startPractice">
        开始练习
      </button>

      <!-- 错题集入口 -->
      <div class="wrong-questions card">
        <div class="wrong-header">
          <h4>📝 我的错题集</h4>
          <span class="wrong-count">23题</span>
        </div>
        <p>复习错题，巩固知识</p>
        <button class="review-btn btn-outline">查看错题</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.practice-page {
  padding: 20px 0;
  min-height: 100vh;
}

.back-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 16px;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 16px;
}

.stats-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: var(--bg-gray);
  border-radius: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.selection-section {
  margin-bottom: 20px;
}

.selection-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.type-btn {
  padding: 14px;
  border: 2px solid var(--border-color);
  background: white;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-btn:hover {
  border-color: var(--primary-color);
}

.type-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.difficulty-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.difficulty-btn {
  padding: 12px;
  border: 2px solid var(--border-color);
  background: white;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.difficulty-btn:hover {
  border-color: var(--primary-color);
}

.difficulty-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.start-btn {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}

.wrong-questions {
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  border: none;
}

.wrong-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.wrong-header h4 {
  font-size: 16px;
  font-weight: 600;
}

.wrong-count {
  background: var(--secondary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.wrong-questions p {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.review-btn {
  width: 100%;
  padding: 10px;
}

@media (max-width: 768px) {
  .difficulty-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

