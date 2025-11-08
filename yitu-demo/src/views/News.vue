<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '../assets/logo.jpg'

const router = useRouter()

const activeTab = ref('all')

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'event', label: '赛事动态' },
  { key: 'culture', label: '文化活动' },
  { key: 'policy', label: '政策文件' }
]

const newsList = ref([
  {
    id: 1,
    type: 'event',
    title: '2024年万州围棋村超春季赛圆满落幕',
    summary: '经过三天的激烈角逐，2024年万州围棋村超春季赛于4月17日圆满落幕...',
    image: logoImg,
    date: '2024-03-15',
    views: 1580
  },
  {
    id: 2,
    type: 'culture',
    title: '围棋文化进校园活动成功举办',
    summary: '为推广围棋文化，提升青少年围棋水平，万州区围棋协会联合教育局...',
    image: logoImg,
    date: '2024-03-10',
    views: 980
  },
  {
    id: 3,
    type: 'event',
    title: '围棋大师线上讲座预告',
    summary: '应广大棋友要求，我们特邀职业九段棋手进行线上讲座...',
    image: logoImg,
    date: '2024-03-08',
    views: 2350
  },
  {
    id: 4,
    type: 'policy',
    title: '关于推进围棋文化发展的实施意见',
    summary: '为深入贯彻落实国家体育总局关于围棋发展的指导意见...',
    image: logoImg,
    date: '2024-03-05',
    views: 1120
  },
  {
    id: 5,
    type: 'culture',
    title: '围棋文化研学活动报名开启',
    summary: '万州围棋文化研学基地现已开放预约，提供围棋文化体验、亲子围棋活动...',
    image: logoImg,
    date: '2024-03-01',
    views: 1680
  }
])

const filteredNews = ref([])

const filterNews = () => {
  if (activeTab.value === 'all') {
    filteredNews.value = newsList.value
  } else {
    filteredNews.value = newsList.value.filter(news => news.type === activeTab.value)
  }
}

const goToDetail = (id) => {
  router.push(`/news/${id}`)
}

filterNews()
</script>

<template>
  <div class="news-page">
    <div class="container">
      <!-- 标签页 -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key; filterNews()"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 新闻列表 -->
      <div class="news-list">
        <div
          v-for="news in filteredNews"
          :key="news.id"
          class="news-card"
          @click="goToDetail(news.id)"
        >
          <div class="news-image">
            <img :src="news.image" :alt="news.title" />
          </div>
          <div class="news-content">
            <h3 class="news-title">{{ news.title }}</h3>
            <p class="news-summary">{{ news.summary }}</p>
            <div class="news-meta">
              <span class="news-date">📅 {{ news.date }}</span>
              <span class="news-views">👁️ {{ news.views }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredNews.length === 0" class="empty-state">
        <div class="empty-icon">📰</div>
        <p>暂无内容</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-page {
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

.news-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.news-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.3s ease;
}

.news-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
}

.news-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #f5f5f5;
  transition: transform 0.3s ease;
}

.news-card:hover .news-image img {
  transform: scale(1.05);
}

.news-content {
  padding: 16px;
}

.news-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.news-summary {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.6;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-light);
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
  .news-image {
    height: 160px;
  }

  .news-title {
    font-size: 16px;
  }
}
</style>

