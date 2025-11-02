<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoImg from '../assets/logo.jpg'

const router = useRouter()
const route = useRoute()

const showRegistrationForm = ref(false)

const event = ref({
  id: 1,
  title: '2024万州围棋村超春季赛',
  type: '个人赛',
  status: 'ongoing',
  date: '2024-04-15',
  endDate: '2024-04-17',
  location: '万州区围棋文化中心',
  address: '重庆市万州区高笋塘路123号',
  participants: 128,
  maxParticipants: 200,
  fee: 50,
  image: logoImg,
  description: '万州围棋村超春季赛是一年一度的围棋盛事，旨在推广围棋文化，提升棋手水平。本次比赛采用积分循环赛制，欢迎各级别棋手报名参加。',
  rules: [
    '比赛采用中国围棋规则',
    '每局比赛时间为60分钟，读秒30秒',
    '采用积分循环赛制，胜者得2分，负者得0分',
    '如遇平局，双方各得1分',
    '最终按积分排名决定名次'
  ],
  prizes: [
    { rank: '冠军', prize: '奖金5000元 + 奖杯' },
    { rank: '亚军', prize: '奖金3000元 + 奖杯' },
    { rank: '季军', prize: '奖金2000元 + 奖杯' },
    { rank: '4-8名', prize: '奖金500元' }
  ],
  schedule: [
    { date: '2024-04-15', time: '09:00', event: '开幕式及抽签' },
    { date: '2024-04-15', time: '10:00', event: '第一轮比赛' },
    { date: '2024-04-15', time: '14:00', event: '第二轮比赛' },
    { date: '2024-04-16', time: '09:00', event: '第三轮比赛' },
    { date: '2024-04-16', time: '14:00', event: '第四轮比赛' },
    { date: '2024-04-17', time: '09:00', event: '决赛' },
    { date: '2024-04-17', time: '14:00', event: '颁奖典礼' }
  ]
})

const registrationForm = ref({
  name: '',
  phone: '',
  idCard: '',
  gender: '男',
  age: '',
  level: '',
  team: ''
})

const goBack = () => {
  router.back()
}

const openRegistrationForm = () => {
  showRegistrationForm.value = true
}

const closeRegistrationForm = () => {
  showRegistrationForm.value = false
}

const submitRegistration = () => {
  // 验证表单
  if (!registrationForm.value.name || !registrationForm.value.phone) {
    alert('请填写必填信息')
    return
  }
  
  alert('报名成功！请前往个人中心查看报名记录')
  closeRegistrationForm()
  router.push('/profile')
}
</script>

<template>
  <div class="event-detail-page">
    <!-- 头图 -->
    <div class="event-header">
      <img :src="event.image" :alt="event.title" />
      <button class="back-btn" @click="goBack">← 返回</button>
    </div>

    <div class="container">
      <!-- 基本信息 -->
      <div class="event-basic">
        <h1 class="event-title">{{ event.title }}</h1>
        <div class="event-meta">
          <span class="meta-item">
            <span class="meta-icon">🏷️</span>
            {{ event.type }}
          </span>
          <span class="meta-item">
            <span class="meta-icon">👥</span>
            {{ event.participants }}/{{ event.maxParticipants }}人
          </span>
          <span class="meta-item">
            <span class="meta-icon">💰</span>
            {{ event.fee === 0 ? '免费' : `¥${event.fee}` }}
          </span>
        </div>
      </div>

      <!-- 时间地点 -->
      <div class="info-section card">
        <h3 class="section-title">时间地点</h3>
        <div class="info-list">
          <div class="info-row">
            <span class="info-label">📅 比赛时间</span>
            <span class="info-value">{{ event.date }} - {{ event.endDate }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">📍 比赛地点</span>
            <span class="info-value">{{ event.location }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">🏠 详细地址</span>
            <span class="info-value">{{ event.address }}</span>
          </div>
        </div>
      </div>

      <!-- 赛事简介 -->
      <div class="info-section card">
        <h3 class="section-title">赛事简介</h3>
        <p class="description">{{ event.description }}</p>
      </div>

      <!-- 比赛规则 -->
      <div class="info-section card">
        <h3 class="section-title">比赛规则</h3>
        <ul class="rules-list">
          <li v-for="(rule, index) in event.rules" :key="index">{{ rule }}</li>
        </ul>
      </div>

      <!-- 奖项设置 -->
      <div class="info-section card">
        <h3 class="section-title">奖项设置</h3>
        <div class="prizes-list">
          <div v-for="prize in event.prizes" :key="prize.rank" class="prize-item">
            <span class="prize-rank">{{ prize.rank }}</span>
            <span class="prize-value">{{ prize.prize }}</span>
          </div>
        </div>
      </div>

      <!-- 赛程安排 -->
      <div class="info-section card">
        <h3 class="section-title">赛程安排</h3>
        <div class="schedule-list">
          <div v-for="(item, index) in event.schedule" :key="index" class="schedule-item">
            <div class="schedule-time">
              <div class="schedule-date">{{ item.date }}</div>
              <div class="schedule-clock">{{ item.time }}</div>
            </div>
            <div class="schedule-event">{{ item.event }}</div>
          </div>
        </div>
      </div>

      <!-- 报名按钮 -->
      <div class="action-section">
        <button class="register-btn btn-primary" @click="openRegistrationForm">
          立即报名
        </button>
      </div>
    </div>

    <!-- 报名表单弹窗 -->
    <div v-if="showRegistrationForm" class="modal-overlay" @click="closeRegistrationForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>报名信息</h3>
          <button class="close-btn" @click="closeRegistrationForm">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>姓名 <span class="required">*</span></label>
            <input v-model="registrationForm.name" type="text" class="input" placeholder="请输入真实姓名" />
          </div>
          <div class="form-group">
            <label>手机号 <span class="required">*</span></label>
            <input v-model="registrationForm.phone" type="tel" class="input" placeholder="请输入手机号" maxlength="11" />
          </div>
          <div class="form-group">
            <label>身份证号</label>
            <input v-model="registrationForm.idCard" type="text" class="input" placeholder="请输入身份证号" maxlength="18" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>性别</label>
              <select v-model="registrationForm.gender" class="input">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
            <div class="form-group">
              <label>年龄</label>
              <input v-model="registrationForm.age" type="number" class="input" placeholder="年龄" />
            </div>
          </div>
          <div class="form-group">
            <label>棋力等级</label>
            <input v-model="registrationForm.level" type="text" class="input" placeholder="如：业余5段" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-outline" @click="closeRegistrationForm">取消</button>
          <button class="btn-primary" @click="submitRegistration">提交报名</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-detail-page {
  padding-bottom: 100px;
}

.event-header {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.event-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

.back-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

.event-basic {
  padding: 20px 0;
}

.event-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.event-meta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--text-secondary);
}

.meta-icon {
  font-size: 16px;
}

.info-section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.info-label {
  font-size: 14px;
  color: var(--text-secondary);
  white-space: nowrap;
}

.info-value {
  font-size: 14px;
  color: var(--text-primary);
  text-align: right;
}

.description {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.rules-list {
  list-style: none;
  padding: 0;
}

.rules-list li {
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.rules-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: bold;
}

.prizes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.prize-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--bg-gray);
  border-radius: 8px;
}

.prize-rank {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-color);
}

.prize-value {
  font-size: 14px;
  color: var(--text-secondary);
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.schedule-item {
  display: flex;
  gap: 16px;
  padding: 12px;
  background: var(--bg-gray);
  border-radius: 8px;
}

.schedule-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.schedule-date {
  font-size: 12px;
  color: var(--text-light);
}

.schedule-clock {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-color);
}

.schedule-event {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--text-primary);
}

.action-section {
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  border-top: 1px solid var(--border-color);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.register-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--text-primary);
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.required {
  color: #f44336;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

select.input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid var(--border-color);
}

.modal-footer button {
  flex: 1;
  padding: 12px;
  font-size: 14px;
}

@media (max-width: 768px) {
  .event-header {
    height: 200px;
  }

  .event-title {
    font-size: 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>

