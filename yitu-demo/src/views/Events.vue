<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '../assets/logo.jpg'

const router = useRouter()

const activeTab = ref('ongoing')

const events = ref([
  {
    id: 1,
    title: '2024万州围棋村超春季赛',
    type: '个人赛',
    status: 'ongoing',
    date: '2024-04-15',
    location: '万州区围棋文化中心',
    participants: 128,
    maxParticipants: 200,
    fee: 50,
    image: logoImg,
    tags: ['线下赛', '积分赛']
  },
  {
    id: 2,
    title: '青少年围棋锦标赛',
    type: '团体赛',
    status: 'ongoing',
    date: '2024-04-20',
    location: '万州区体育馆',
    participants: 45,
    maxParticipants: 64,
    fee: 0,
    image: logoImg,
    tags: ['线下赛', '青少年']
  },
  {
    id: 3,
    title: '围棋村超线上月赛',
    type: '个人赛',
    status: 'ongoing',
    date: '2024-04-10',
    location: '线上',
    participants: 256,
    maxParticipants: 500,
    fee: 0,
    image: logoImg,
    tags: ['线上赛', '免费']
  },
  {
    id: 4,
    title: '2024围棋村超夏季赛',
    type: '个人赛',
    status: 'upcoming',
    date: '2024-06-01',
    location: '万州区围棋文化中心',
    participants: 0,
    maxParticipants: 200,
    fee: 50,
    image: logoImg,
    tags: ['线下赛', '积分赛']
  },
  {
    id: 5,
    title: '2023围棋村超冬季赛',
    type: '个人赛',
    status: 'finished',
    date: '2023-12-15',
    location: '万州区围棋文化中心',
    participants: 180,
    maxParticipants: 200,
    fee: 50,
    image: logoImg,
    tags: ['线下赛', '已结束']
  }
])

const tabs = [
  { key: 'ongoing', label: '报名中', count: 3 },
  { key: 'upcoming', label: '即将开始', count: 1 },
  { key: 'finished', label: '已结束', count: 1 }
]

const filteredEvents = ref([])

const filterEvents = () => {
  filteredEvents.value = events.value.filter(event => event.status === activeTab.value)
}

const goToDetail = (id) => {
  router.push(`/event/${id}`)
}

const getStatusText = (status) => {
  const statusMap = {
    ongoing: '报名中',
    upcoming: '即将开始',
    finished: '已结束'
  }
  return statusMap[status] || ''
}

const getStatusClass = (status) => {
  return `status-${status}`
}

filterEvents()
</script>

<template>
  <div class="events-page">
    <div class="container">
      <!-- 标签页 -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key; filterEvents()"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 赛事列表 -->
      <div class="events-list">
        <div
          v-for="event in filteredEvents"
          :key="event.id"
          class="event-card"
          @click="goToDetail(event.id)"
        >
          <div class="event-image">
            <img :src="event.image" :alt="event.title" />
            <div class="event-status" :class="getStatusClass(event.status)">
              {{ getStatusText(event.status) }}
            </div>
          </div>
          <div class="event-content">
            <h3 class="event-title">{{ event.title }}</h3>
            <div class="event-info">
              <div class="info-item">
                <span class="info-icon">📅</span>
                <span>{{ event.date }}</span>
              </div>
              <div class="info-item">
                <span class="info-icon">📍</span>
                <span>{{ event.location }}</span>
              </div>
              <div class="info-item">
                <span class="info-icon">👥</span>
                <span>{{ event.participants }}/{{ event.maxParticipants }}人</span>
              </div>
              <div class="info-item">
                <span class="info-icon">💰</span>
                <span>{{ event.fee === 0 ? '免费' : `¥${event.fee}` }}</span>
              </div>
            </div>
            <div class="event-tags">
              <span v-for="tag in event.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="filteredEvents.length === 0" class="empty-state">
          <div class="empty-icon">📭</div>
          <p>暂无赛事</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.events-page {
  padding: 20px 0;
  min-height: 100vh;
}

.tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 12px 0;
  margin-bottom: 20px;
  -webkit-overflow-scrolling: touch;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tab-btn {
  padding: 8px 20px;
  border: 1px solid var(--border-color);
  background: white;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  border-color: var(--primary-color);
}

.tab-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.3s ease;
}

.event-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
}

.event-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #f5f5f5;
}

.event-status {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.status-ongoing {
  background: #4caf50;
}

.status-upcoming {
  background: #ff9800;
}

.status-finished {
  background: #9e9e9e;
}

.event-content {
  padding: 16px;
}

.event-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.event-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-secondary);
}

.info-icon {
  font-size: 16px;
}

.event-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
}

.empty-icon {
  font-size: 60px;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 16px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .event-image {
    height: 160px;
  }

  .event-title {
    font-size: 16px;
  }

  .event-info {
    grid-template-columns: 1fr;
  }
}
</style>

