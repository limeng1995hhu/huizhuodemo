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
            <p>{{ banner.subtitle }}</p>
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

    <!-- 功能入口 -->
    <div class="features-section">
      <div class="container">
        <h3 class="section-title">功能导航</h3>
        <div class="features-grid">
          <div
            v-for="feature in features"
            :key="feature.id"
            class="feature-card"
            @click="goToFeature(feature.path)"
          >
            <div class="feature-icon" :style="{ backgroundColor: feature.color }">
              {{ feature.icon }}
            </div>
            <div class="feature-title">{{ feature.title }}</div>
            <div class="feature-desc">{{ feature.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最新动态 -->
    <div class="news-section">
      <div class="container">
        <div class="section-header">
          <h3 class="section-title">最新动态</h3>
          <router-link to="/news" class="more-link">更多 →</router-link>
        </div>
        <div class="news-list">
          <div
            v-for="item in news"
            :key="item.id"
            class="news-card"
            @click="goToNews(item.id)"
          >
            <img :src="item.image" :alt="item.title" class="news-image" />
            <div class="news-content">
              <h4 class="news-title">{{ item.title }}</h4>
              <p class="news-date">{{ item.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding-bottom: 20px;
}

.banner-section {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
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
  bottom: 30px;
  left: 20px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.banner-content h2 {
  font-size: 28px;
  margin-bottom: 8px;
}

.banner-content p {
  font-size: 16px;
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
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: white;
  width: 24px;
  border-radius: 4px;
}

.features-section {
  padding: 30px 0;
  background: white;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: var(--bg-gray);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin-bottom: 12px;
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.feature-desc {
  font-size: 12px;
  color: var(--text-secondary);
  text-align: center;
}

.news-section {
  padding: 30px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.more-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 14px;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.news-card {
  display: flex;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.3s ease;
}

.news-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.news-image {
  width: 120px;
  height: 90px;
  object-fit: cover;
}

.news-content {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.news-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.news-date {
  font-size: 12px;
  color: var(--text-light);
}

@media (max-width: 768px) {
  .banner-section {
    height: 200px;
  }

  .banner-content h2 {
    font-size: 20px;
  }

  .banner-content p {
    font-size: 14px;
  }

  .features-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .feature-card {
    padding: 16px 8px;
  }

  .feature-icon {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }

  .feature-title {
    font-size: 14px;
  }

  .feature-desc {
    font-size: 11px;
  }
}
</style>

