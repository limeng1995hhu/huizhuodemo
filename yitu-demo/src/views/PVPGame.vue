<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const matching = ref(false)
const matched = ref(false)

const startMatching = () => {
  matching.value = true
  setTimeout(() => {
    matching.value = false
    matched.value = true
  }, 2000)
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="pvp-game-page">
    <div class="container">
      <button class="back-btn" @click="goBack">← 返回</button>
      
      <h1 class="page-title">人人对弈</h1>

      <div v-if="!matching && !matched" class="ready-section">
        <div class="ready-card card">
          <div class="ready-icon">👥</div>
          <h3>准备开始对弈</h3>
          <p>系统将根据您的棋力等级匹配合适的对手</p>
          <button class="match-btn btn-primary" @click="startMatching">
            开始匹配
          </button>
        </div>

        <div class="info-card card">
          <h4>对弈规则</h4>
          <ul>
            <li>每方基础时间30分钟</li>
            <li>读秒时间30秒</li>
            <li>支持认输和申请和棋</li>
          </ul>
        </div>
      </div>

      <div v-if="matching" class="matching-section">
        <div class="matching-card card">
          <div class="matching-animation">
            <div class="spinner"></div>
          </div>
          <h3>正在匹配对手...</h3>
          <p>请稍候</p>
        </div>
      </div>

      <div v-if="matched" class="game-section">
        <div class="match-info card">
          <div class="opponent-info">
            <div class="avatar">👤</div>
            <div class="info">
              <div class="name">对手昵称</div>
              <div class="level">业余3段</div>
            </div>
          </div>
          <div class="vs">VS</div>
          <div class="opponent-info">
            <div class="avatar">👤</div>
            <div class="info">
              <div class="name">我</div>
              <div class="level">业余3段</div>
            </div>
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
          <button class="control-btn">认输</button>
          <button class="control-btn">申请和棋</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pvp-game-page {
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

.ready-section {
  max-width: 600px;
  margin: 0 auto;
}

.ready-card {
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 20px;
}

.ready-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.ready-card h3 {
  font-size: 24px;
  margin-bottom: 12px;
}

.ready-card p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.match-btn {
  padding: 14px 48px;
  font-size: 16px;
}

.info-card h4 {
  font-size: 16px;
  margin-bottom: 12px;
}

.info-card ul {
  list-style: none;
  padding: 0;
}

.info-card li {
  padding: 6px 0;
  padding-left: 20px;
  position: relative;
  font-size: 14px;
  color: var(--text-secondary);
}

.info-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary-color);
}

.matching-section {
  max-width: 600px;
  margin: 0 auto;
}

.matching-card {
  text-align: center;
  padding: 60px 20px;
}

.matching-animation {
  margin-bottom: 24px;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.matching-card h3 {
  font-size: 20px;
  margin-bottom: 8px;
}

.matching-card p {
  color: var(--text-secondary);
}

.game-section {
  max-width: 800px;
  margin: 0 auto;
}

.match-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 24px;
  margin-bottom: 20px;
}

.opponent-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--bg-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.info {
  text-align: center;
}

.name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.level {
  font-size: 12px;
  color: var(--text-secondary);
}

.vs {
  font-size: 24px;
  font-weight: 700;
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
</style>

