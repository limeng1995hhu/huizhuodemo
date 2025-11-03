<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Trophy, Reading, Clock } from '@element-plus/icons-vue'
import logoImg from '../assets/logo.jpg'

const router = useRouter()
const searchText = ref('')
const currentBanner = ref(0)

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

// 自动更新当前轮播索引
setInterval(() => {
  currentBanner.value = (currentBanner.value + 1) % banners.value.length
}, 5000)

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
    <!-- 搜索框 -->
    <div class="search-section">
      <el-input
        v-model="searchText"
        placeholder="搜索围棋资源"
        :prefix-icon="Search"
        size="large"
        class="search-input"
      />
    </div>

    <!-- 轮播图 -->
    <div class="banner-section">
      <el-carousel height="200px" :interval="5000" arrow="never" indicator-position="none">
        <el-carousel-item v-for="banner in banners" :key="banner.id">
          <img :src="banner.image" :alt="banner.title" class="banner-image" />
          <div class="banner-content">
            <h2>{{ banner.title }}</h2>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="custom-indicators">
        <span
          v-for="(banner, index) in banners"
          :key="banner.id"
          class="indicator-dot"
          :class="{ active: index === currentBanner }"
          @click="currentBanner = index"
        ></span>
      </div>
    </div>

    <!-- 主功能卡片 -->
    <div class="main-features-section">
      <el-row :gutter="12">
        <el-col :span="12">
          <el-card class="main-feature-card green-card" shadow="hover" @click="goToFeature('/learning/pvp-game')">
            <div class="card-content">
              <el-icon :size="40" class="feature-icon"><Trophy /></el-icon>
              <div class="feature-text">
                <h3>在线对弈</h3>
                <p>开战</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="main-feature-card blue-card" shadow="hover" @click="goToFeature('/learning')">
            <div class="card-content">
              <el-icon :size="40" class="feature-icon"><Reading /></el-icon>
              <div class="feature-text">
                <h3>学棋</h3>
                <p>做题、视频讲解</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 宣传栏列表 -->
    <div class="news-section">
      <el-card
        v-for="item in news"
        :key="item.id"
        class="news-card"
        shadow="hover"
        @click="goToNews(item.id)"
      >
        <div class="news-item">
          <el-image
            :src="item.image"
            :alt="item.title"
            class="news-thumbnail"
            fit="cover"
          />
          <div class="news-content">
            <h4 class="news-title">{{ item.title }}</h4>
            <div class="news-footer">
              <el-icon class="time-icon"><Clock /></el-icon>
              <span class="news-date">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding-bottom: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

/* 搜索框 */
.search-section {
  padding: 16px;
  background: #ffffff;
}

.search-input {
  border-radius: 24px;
}

:deep(.el-input__wrapper) {
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* 轮播图 */
.banner-section {
  margin: 0 16px 20px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

:deep(.el-carousel) {
  border-radius: 12px;
}

:deep(.el-carousel__item) {
  position: relative;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-content {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 10;
}

.banner-content h2 {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  color: #333;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.95),
               0 2px 4px rgba(255, 255, 255, 0.8);
}

/* 自定义圆点指示器 */
.custom-indicators {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator-dot:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.indicator-dot.active {
  background-color: var(--primary-color);
  width: 24px;
  border-radius: 4px;
}

/* 主功能卡片 */
.main-features-section {
  padding: 0 16px 20px;
  background: #f5f5f5;
}

.main-feature-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.main-feature-card:active {
  transform: scale(0.98);
}

.green-card {
  background: var(--gradient-green);
}

.blue-card {
  background: var(--gradient-blue);
}

:deep(.el-card__body) {
  padding: 20px;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.feature-icon {
  color: white;
  flex-shrink: 0;
}

.feature-text {
  flex: 1;
  color: white;
}

.feature-text h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.feature-text p {
  font-size: 12px;
  margin: 0;
  opacity: 0.9;
}

/* 宣传栏列表 */
.news-section {
  padding: 0 16px 20px;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.news-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.news-card:active {
  transform: scale(0.98);
}

:deep(.news-card .el-card__body) {
  padding: 12px;
}

.news-item {
  display: flex;
  gap: 12px;
}

.news-thumbnail {
  width: 100px;
  height: 75px;
  border-radius: 8px;
  flex-shrink: 0;
}

.news-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.news-footer {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
}

.time-icon {
  font-size: 12px;
  color: #999;
}

.news-date {
  font-size: 12px;
  color: #999;
}

@media (max-width: 768px) {
  .banner-section {
    margin: 0 12px 16px;
  }

  .banner-content h2 {
    font-size: 18px;
  }

  :deep(.el-card__body) {
    padding: 16px;
  }

  .feature-icon {
    font-size: 36px;
  }

  .feature-text h3 {
    font-size: 18px;
  }

  .feature-text p {
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

