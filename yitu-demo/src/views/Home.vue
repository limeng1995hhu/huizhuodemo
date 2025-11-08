<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Trophy, Reading, Clock, Compass, ShoppingBag } from '@element-plus/icons-vue'
import logoImg from '../assets/logo.jpg'

const router = useRouter()
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

const partners = ref([
  { id: 1, name: '合作伙伴1', logo: logoImg },
  { id: 2, name: '合作伙伴2', logo: logoImg },
  { id: 3, name: '合作伙伴3', logo: logoImg },
  { id: 4, name: '合作伙伴4', logo: logoImg },
  { id: 5, name: '合作伙伴5', logo: logoImg },
  { id: 6, name: '合作伙伴6', logo: logoImg }
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
      <div class="banner-wrapper">
        <div
          v-for="(banner, index) in banners"
          :key="banner.id"
          class="banner-slide"
          :class="{ active: index === currentBanner }"
          :style="{ backgroundImage: `url(${banner.image})` }"
        >
        </div>
      </div>
    </div>
    <!-- 轮播图指示器 -->
    <div class="custom-indicators">
      <span
        v-for="(banner, index) in banners"
        :key="banner.id"
        class="indicator-dot"
        :class="{ active: index === currentBanner }"
        @click="currentBanner = index"
      ></span>
    </div>

    <!-- 主功能卡片 -->
    <div class="main-features-section">
      <el-row :gutter="12">
        <el-col :span="12">
          <el-card class="main-feature-card green-card" shadow="hover" @click="goToFeature('/learning/pvp-game')">
            <div class="card-content">
              <el-icon :size="32" class="feature-icon"><Trophy /></el-icon>
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
              <el-icon :size="32" class="feature-icon"><Reading /></el-icon>
              <div class="feature-text">
                <h3>学棋</h3>
                <p>做题、视频讲解</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="margin-top: 12px;">
        <el-col :span="12">
          <el-card class="main-feature-card orange-card" shadow="hover" @click="goToFeature('/events')">
            <div class="card-content">
              <el-icon :size="32" class="feature-icon"><Compass /></el-icon>
              <div class="feature-text">
                <h3>研学</h3>
                <p>旅游资讯</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="main-feature-card purple-card" shadow="hover" @click="goToFeature('/shop')">
            <div class="card-content">
              <el-icon :size="32" class="feature-icon"><ShoppingBag /></el-icon>
              <div class="feature-text">
                <h3>文创</h3>
                <p>在线购物</p>
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

    <!-- 赞助商广告位 -->
    <div class="sponsor-section">
      <div class="section-header">
        <div class="header-line"></div>
        <h3 class="section-title">赞助商</h3>
      </div>
      <el-card class="sponsor-card" shadow="hover">
        <div class="sponsor-image" :style="{ backgroundImage: `url(${logoImg})` }">
          <div class="ad-badge">广告</div>
        </div>
      </el-card>
    </div>

    <!-- 合作伙伴 -->
    <div class="partner-section">
      <div class="section-header">
        <div class="header-line"></div>
        <h3 class="section-title">合作伙伴</h3>
      </div>
      <div class="partner-grid">
        <div
          v-for="partner in partners"
          :key="partner.id"
          class="partner-item"
        >
          <el-image
            :src="partner.logo"
            :alt="partner.name"
            class="partner-logo"
            fit="contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding-bottom: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

/* 轮播图 - Apple风格 */
.banner-section {
  margin: 20px 20px 12px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  height: 120px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.banner-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.banner-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f5f5f5;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.banner-slide.active {
  opacity: 1;
  z-index: 2;
}

/* 自定义圆点指示器 - Apple风格 */
.custom-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 0 20px 24px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.indicator-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.indicator-dot:hover {
  background-color: rgba(0, 0, 0, 0.5);
  transform: scale(1.15);
}

.indicator-dot.active {
  background-color: rgba(0, 0, 0, 0.8);
  width: 24px;
  border-radius: 4px;
}

/* 主功能卡片 - Apple风格 */
.main-features-section {
  padding: 0 20px 24px;
  background: #f5f5f5;
}

.main-feature-card {
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  border: none;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}

.main-feature-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.main-feature-card:active {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.2s cubic-bezier(0.28, 0.11, 0.32, 1);
}

.green-card {
  position: relative;
  overflow: hidden;
}

/* 背景图片层 */
.green-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/battle.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3; /* 调整这个值来控制背景图片透明度：0（完全透明）到 1（完全不透明） */
  z-index: 1;
  pointer-events: none;
}

/* 绿色渐变遮罩层 */
.green-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 166, 81, 0.7) 0%, rgba(0, 200, 83, 0.6) 100%);
  z-index: 2;
  pointer-events: none;
}

.blue-card {
  position: relative;
  overflow: hidden;
}

/* 背景图片层 */
.blue-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/course.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3; /* 调整这个值来控制背景图片透明度：0（完全透明）到 1（完全不透明） */
  z-index: 1;
  pointer-events: none;
}

/* 蓝色渐变遮罩层 */
.blue-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 160, 233, 0.7) 0%, rgba(2, 136, 209, 0.6) 100%);
  z-index: 2;
  pointer-events: none;
}

.orange-card {
  position: relative;
  overflow: hidden;
}

/* 背景图片层 */
.orange-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/travel.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 1;
  pointer-events: none;
}

/* 橙色渐变遮罩层 */
.orange-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 107, 0, 0.85) 0%, rgba(255, 143, 0, 0.75) 100%);
  z-index: 2;
  pointer-events: none;
}

.purple-card {
  position: relative;
  overflow: hidden;
}

/* 背景图片层 */
.purple-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/shop.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 1;
  pointer-events: none;
}

/* 紫色渐变遮罩层 */
.purple-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(156, 39, 176, 0.85) 0%, rgba(171, 71, 188, 0.75) 100%);
  z-index: 2;
  pointer-events: none;
}

:deep(.main-feature-card .el-card__body) {
  padding: 16px;
  position: relative;
  z-index: 3;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.feature-icon {
  color: white;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.15));
  font-size: 32px;
}

.feature-text {
  flex: 1;
  color: white;
}

.feature-text h3 {
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 2px 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.3px;
}

.feature-text p {
  font-size: 12px;
  margin: 0;
  opacity: 0.9;
  font-weight: 400;
  letter-spacing: -0.1px;
}

/* 宣传栏列表 - Apple风格 */
.news-section {
  padding: 0 20px 24px;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.news-card {
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  background: white;
}

.news-card:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.news-card:active {
  transform: translateY(-1px) scale(1.005);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.2s cubic-bezier(0.28, 0.11, 0.32, 1);
}

:deep(.news-card .el-card__body) {
  padding: 14px;
}

.news-item {
  display: flex;
  gap: 14px;
}

.news-thumbnail {
  width: 100px;
  height: 75px;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.news-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2px 0;
}

.news-title {
  font-size: 15px;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  letter-spacing: -0.2px;
}

.news-footer {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
  margin-top: 6px;
}

.time-icon {
  font-size: 12px;
  color: #86868b;
}

.news-date {
  font-size: 12px;
  color: #86868b;
  font-weight: 400;
  letter-spacing: -0.1px;
}

/* 赞助商广告位 - Apple风格 */
.sponsor-section {
  padding: 0 20px 24px;
  background: #f5f5f5;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.header-line {
  width: 3px;
  height: 24px;
  background: var(--gradient-green);
  border-radius: 1.5px;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
  letter-spacing: -0.5px;
}

.sponsor-card {
  position: relative;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}

.sponsor-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.sponsor-card:active {
  transform: translateY(-2px) scale(1.005);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.2s cubic-bezier(0.28, 0.11, 0.32, 1);
}

:deep(.sponsor-card .el-card__body) {
  padding: 0;
}

.sponsor-image {
  width: 100%;
  height: 180px;
  border-radius: 16px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f5f5f5;
  position: relative;
}

.ad-badge {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* 合作伙伴 - Apple风格 */
.partner-section {
  padding: 0 20px 24px;
  background: #f5f5f5;
}

.partner-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.partner-item {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.partner-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 166, 81, 0.03) 0%, rgba(0, 160, 233, 0.03) 100%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.partner-item:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px) scale(1.02);
}

.partner-item:hover::before {
  opacity: 1;
}

.partner-logo {
  width: 100%;
  height: 60px;
  position: relative;
  z-index: 1;
  filter: grayscale(20%);
  transition: filter 0.3s ease;
}

.partner-item:hover .partner-logo {
  filter: grayscale(0%);
}

@media (max-width: 768px) {
  .banner-section {
    margin: 12px 12px 8px;
    height: 100px;
  }

  .custom-indicators {
    margin: 0 12px 16px;
    gap: 6px;
    padding: 5px 10px;
  }

  .indicator-dot {
    width: 6px;
    height: 6px;
  }

  .indicator-dot.active {
    width: 20px;
  }

  :deep(.main-feature-card .el-card__body) {
    padding: 14px;
  }

  :deep(.news-card .el-card__body) {
    padding: 12px;
  }

  .feature-icon {
    font-size: 28px;
  }

  .feature-text h3 {
    font-size: 15px;
  }

  .feature-text p {
    font-size: 11px;
  }

  .news-thumbnail {
    width: 90px;
    height: 68px;
  }

  .news-title {
    font-size: 15px;
  }

  .news-date {
    font-size: 12px;
  }

  .section-title {
    font-size: 17px;
  }

  .sponsor-image {
    height: 160px;
  }

  .partner-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .partner-item {
    padding: 20px;
  }

  .partner-logo {
    height: 50px;
  }
}
</style>

