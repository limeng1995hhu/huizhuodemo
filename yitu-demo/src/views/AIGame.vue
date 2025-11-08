<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedLevel = ref('5k')
const gameStarted = ref(false)

const levels = [
  { value: '18k', label: '18k' },
  { value: '15k', label: '15k' },
  { value: '10k', label: '10k' },
  { value: '5k', label: '5k' },
  { value: '1k', label: '1k' },
  { value: '1d', label: '1d' },
  { value: '3d', label: '3d' },
  { value: '5d', label: '5d' },
  { value: '9d', label: '9d' }
]

const startGame = () => {
  gameStarted.value = true
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="ai-game-page">
    <div class="container">
      <button class="back-btn" @click="goBack">← 返回</button>
      
      <div v-if="!gameStarted" class="setup-section">
        <h1 class="page-title">AI对弈</h1>
        <div class="setup-card card">
          <div class="levels-grid">
            <button
              v-for="level in levels"
              :key="level.value"
              class="level-btn"
              :class="{ active: selectedLevel === level.value }"
              @click="selectedLevel = level.value"
            >
              {{ level.label }}
            </button>
          </div>
          <button class="start-btn btn-primary" @click="startGame">
            开始对弈
          </button>
        </div>
        
        <div class="tips-card card">
          <h4>💡 对弈说明</h4>
          <p class="time-rule">每方30分钟30秒3次</p>
        </div>
      </div>

      <div v-else class="game-section">
        <div class="game-header">
          <div class="player-info">
            <span>👤 你</span>
            <span class="player-color">执黑</span>
          </div>
          <div class="game-status">对弈中</div>
          <div class="player-info">
            <span>🤖 AI</span>
            <span class="player-color">执白</span>
          </div>
        </div>

        <div class="board-container">
          <div class="go-board">
            <div class="board-placeholder">
              <p>围棋棋盘</p>
              <p class="board-note">（实际项目中集成围棋引擎）</p>
            </div>
          </div>
        </div>

        <div class="game-controls">
          <button class="control-btn">悔棋</button>
          <button class="control-btn">认输</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-game-page {
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

.back-btn:hover {
  color: var(--primary-color);
}

.setup-section {
  max-width: 600px;
  margin: 0 auto;
}

.setup-card {
  margin-bottom: 20px;
}

.setup-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.levels-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.level-btn {
  padding: 16px;
  border: 2px solid var(--border-color);
  background: white;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.level-btn:hover {
  border-color: var(--primary-color);
}

.level-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.start-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
}

.tips-card h4 {
  font-size: 16px;
  margin-bottom: 12px;
}

.time-rule {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  padding: 8px 0;
}

.game-section {
  max-width: 800px;
  margin: 0 auto;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: var(--shadow);
}

.player-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.player-color {
  font-size: 12px;
  color: var(--text-secondary);
}

.game-status {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-color);
}

.board-container {
  margin-bottom: 20px;
}

.go-board {
  aspect-ratio: 1;
  background: #daa520;
  border-radius: 8px;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
}

.board-placeholder {
  text-align: center;
  color: #8b4513;
}

.board-placeholder p {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.board-note {
  font-size: 14px !important;
  opacity: 0.7;
}

.game-controls {
  display: flex;
  gap: 12px;
}

.control-btn {
  flex: 1;
  padding: 12px;
  border: 1px solid var(--border-color);
  background: white;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .levels-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

