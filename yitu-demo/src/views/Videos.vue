<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '../assets/logo.jpg'

const router = useRouter()

const activeCategory = ref('all')

const categories = [
  { key: 'all', label: '全部' },
  { key: 'beginner', label: '入门教程' },
  { key: 'basic', label: '基础提升' },
  { key: 'intermediate', label: '中级进阶' },
  { key: 'advanced', label: '高级实战' },
  { key: 'special', label: '专题讲座' }
]

const videos = ref([
  {
    id: 1,
    title: '围棋入门第一课：认识棋盘',
    category: 'beginner',
    duration: '15:30',
    views: 12580,
    thumbnail: logoImg,
    author: '李老师'
  },
  {
    id: 2,
    title: '死活题精讲：基础型',
    category: 'basic',
    duration: '22:15',
    views: 8960,
    thumbnail: logoImg,
    author: '王老师'
  },
  {
    id: 3,
    title: '定式详解：星位小飞',
    category: 'intermediate',
    duration: '28:45',
    views: 6420,
    thumbnail: logoImg,
    author: '张老师'
  },
  {
    id: 4,
    title: '职业棋手对局解析',
    category: 'advanced',
    duration: '45:20',
    views: 15230,
    thumbnail: logoImg,
    author: '陈老师'
  },
  {
    id: 5,
    title: '围棋文化与历史',
    category: 'special',
    duration: '35:10',
    views: 5680,
    thumbnail: logoImg,
    author: '刘老师'
  }
])

const filteredVideos = ref([])

const filterVideos = () => {
  if (activeCategory.value === 'all') {
    filteredVideos.value = videos.value
  } else {
    filteredVideos.value = videos.value.filter(v => v.category === activeCategory.value)
  }
}

const playVideo = (id) => {
  alert(`播放视频 ${id}（实际项目中会打开视频播放器）`)
}

const goBack = () => {
  router.back()
}

filterVideos()
</script>

<template>
  <div class="videos-page">
    <div class="container">
      <button class="back-btn" @click="goBack">← 返回</button>
      
      <h1 class="page-title">教学视频</h1>

      <!-- 分类标签 -->
      <div class="categories">
        <button
          v-for="category in categories"
          :key="category.key"
          class="category-btn"
          :class="{ active: activeCategory === category.key }"
          @click="activeCategory = category.key; filterVideos()"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- 视频列表 -->
      <div class="videos-list">
        <div
          v-for="video in filteredVideos"
          :key="video.id"
          class="video-card"
          @click="playVideo(video.id)"
        >
          <div class="video-thumbnail">
            <img :src="video.thumbnail" :alt="video.title" />
            <div class="video-duration">{{ video.duration }}</div>
            <div class="play-icon">▶</div>
          </div>
          <div class="video-info">
            <h4 class="video-title">{{ video.title }}</h4>
            <div class="video-meta">
              <span class="video-author">👤 {{ video.author }}</span>
              <span class="video-views">👁️ {{ video.views }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredVideos.length === 0" class="empty-state">
        <div class="empty-icon">📹</div>
        <p>该分类暂无视频</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.videos-page {
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

.categories {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 12px 0;
  margin-bottom: 20px;
  -webkit-overflow-scrolling: touch;
}

.categories::-webkit-scrollbar {
  display: none;
}

.category-btn {
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  background: white;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  border-color: var(--primary-color);
}

.category-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.videos-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.video-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.3s ease;
}

.video-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
}

.video-thumbnail {
  position: relative;
  width: 100%;
  padding-top: 60%;
  overflow: hidden;
  background: var(--bg-gray);
}

.video-thumbnail img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-card:hover .play-icon {
  opacity: 1;
}

.video-info {
  padding: 12px;
}

.video-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-secondary);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
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
  .videos-list {
    grid-template-columns: 1fr;
  }
}
</style>

