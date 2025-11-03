<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '../assets/logo.jpg'

const router = useRouter()

const banners = ref([
  {
    id: 1,
    image: logoImg,
    title: '万州围棋村超',
    subtitle: '传承围棋文化，共建围棋之乡'
  },
  {
    id: 2,
    image: logoImg,
    title: '围棋赛事报名',
    subtitle: '精彩赛事，等你来战'
  }
])

const currentBanner = ref(0)

const features = [
  {
    id: 1,
    title: '赛事报名',
    icon: '🏆',
    color: '#ff8c00',
    path: '/events',
    description: '参与围棋赛事'
  },
  {
    id: 2,
    title: 'AI对弈',
    icon: '🤖',
    color: '#4a90e2',
    path: '/learning/ai-game',
    description: '与AI切磋棋艺'
  },
  {
    id: 3,
    title: '人人对弈',
    icon: '👥',
    color: '#2c5f2d',
    path: '/learning/pvp-game',
    description: '在线实时对战'
  },
  {
    id: 4,
    title: '围棋习题',
    icon: '📝',
    color: '#9c27b0',
    path: '/learning/practice',
    description: '提升棋艺水平'
  },
  {
    id: 5,
    title: '教学视频',
    icon: '🎬',
    color: '#f44336',
    path: '/learning/videos',
    description: '名师在线教学'
  },
  {
    id: 6,
    title: '围棋商城',
    icon: '🛒',
    color: '#ff9800',
    path: '/shop',
    description: '文创周边商品'
  }
]

const news = ref([
  {
    id: 1,
    title: '2024年万州围棋村超春季赛圆满落幕',
    date: '2024-03-15',
    image: logoImg
  },
  {
    id: 2,
    title: '围棋文化进校园活动成功举办',
    date: '2024-03-10',
    image: logoImg
  },
  {
    id: 3,
    title: '围棋大师线上讲座预告',
    date: '2024-03-08',
    image: logoImg
  }
])

const goToFeature = (path) => {
  router.push(path)
}

const goToNews = (id) => {
  router.push(`/news/${id}`)
}

setInterval(() => {
  currentBanner.value = (currentBanner.value + 1) % banners.value.length
}, 5000)
</script>

<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="banner-section">
      <div class="banner-container">
        <div
          v-for="(banner, index) in banners"
          :key="banner.id"
          class="banner-item"
          :class="{ active: index === currentBanner }"
        >
          <img :src="banner.image" :alt="banner.title" />
          <div class="banner-content">
            <h2>{{ banner.title }}</h2>
          </div>
        </div>
      </div>
      <div class="banner-dots">
        <span
          v-for="(banner, index) in banners"
          :key="banner.id"
          class="dot"
          :class="{ active: index === currentBanner }"
          @click="currentBanner = index"
        ></span>
      </div>
    </div>

    <!-- 主功能卡片 -->
    <div class="main-features-section">
      <div class="main-features-grid">
        <div class="main-feature-card" @click="goToFeature('/learning/pvp-game')">
          <div class="main-feature-icon">⚔️</div>
          <div class="main-feature-content">
            <h3 class="main-feature-title">在线对弈</h3>
            <p class="main-feature-subtitle">开战</p>
          </div>
        </div>
        <div class="main-feature-card" @click="goToFeature('/learning')">
          <div class="main-feature-icon">📚</div>
          <div class="main-feature-content">
            <h3 class="main-feature-title">学棋</h3>
            <p class="main-feature-subtitle">做题、视频讲解</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 宣传栏列表 -->
    <div class="news-section">
      <div class="news-list">
        <div
          v-for="item in news"
          :key="item.id"
          class="news-item"
          @click="goToNews(item.id)"
        >
          <img :src="item.image" :alt="item.title" class="news-thumbnail" />
          <div class="news-content">
            <h4 class="news-title">{{ item.title }}</h4>
            <p class="news-date">{{ item.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding-bottom: 20px;
  background: #f5f5f5;
}

/* 搜索框 */
.search-section {
  padding: 16px;
  background: #f5f5f5;
}

.search-box {
  display: flex;
  align-items: center;
  background: #e8e8e8;
  border-radius: 20px;
  padding: 10px 16px;
  gap: 8px;
}

.search-icon {
  font-size: 18px;
  color: #999;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}

/* 轮播图 */
.banner-section {
  position: relative;
  width: calc(100% - 32px);
  height: 200px;
  overflow: hidden;
  margin: 0 16px 20px;
  border-radius: 12px;
  background: #f0f0f0;
}

.banner-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.banner-item {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.banner-item.active {
  opacity: 1;
}

.banner-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-content {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
}

.banner-content h2 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #333;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
}

.banner-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: white;
  width: 20px;
  border-radius: 4px;
}

/* 主功能卡片 */
.main-features-section {
  padding: 0 16px 20px;
  background: #f5f5f5;
}

.main-features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.main-feature-card {
  background: linear-gradient(135deg, #1565c0 0%, #1976d2 100%);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.3);
  transition: all 0.3s ease;
  min-height: 90px;
}

.main-feature-card:active {
  transform: scale(0.98);
}

.main-feature-icon {
  font-size: 40px;
  flex-shrink: 0;
}

.main-feature-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.main-feature-title {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 0;
}

.main-feature-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

/* 宣传栏列表 */
.news-section {
  padding: 0 16px 20px;
  background: #f5f5f5;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.news-item {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  padding: 12px;
  gap: 12px;
}

.news-item:active {
  transform: scale(0.98);
}

.news-thumbnail {
  width: 100px;
  height: 75px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.news-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 75px;
}

.news-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.news-date {
  font-size: 12px;
  color: #999;
  text-align: right;
  margin: 0;
}

@media (max-width: 768px) {
  .banner-section {
    height: 180px;
    width: calc(100% - 24px);
    margin: 0 12px 16px;
  }

  .main-feature-card {
    padding: 16px;
    min-height: 80px;
  }

  .main-feature-icon {
    font-size: 36px;
  }

  .main-feature-title {
    font-size: 18px;
  }

  .main-feature-subtitle {
    font-size: 11px;
  }

  .news-thumbnail {
    width: 90px;
    height: 68px;
  }

  .news-title {
    font-size: 14px;
  }

  .news-date {
    font-size: 11px;
  }
}
</style>

