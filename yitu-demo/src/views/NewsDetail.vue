<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const news = ref({
  id: 1,
  title: '2024年万州围棋村超春季赛圆满落幕',
  date: '2024-03-15',
  views: 1580,
  image: 'https://via.placeholder.com/800x400/2c5f2d/ffffff?text=赛事新闻',
  content: `
    <p>经过三天的激烈角逐，2024年万州围棋村超春季赛于4月17日在万州区围棋文化中心圆满落幕。本次比赛吸引了来自全国各地的200余名围棋爱好者参赛，是万州区举办的规模最大的围棋赛事之一。</p>
    
    <h3>赛事亮点</h3>
    <p>本次比赛采用积分循环赛制，经过7轮激烈角逐，最终决出了各个奖项的归属。比赛过程中，选手们展现出了高超的棋艺和良好的竞技精神，为观众奉献了一场场精彩的对局。</p>
    
    <h3>获奖名单</h3>
    <p>冠军：张三（业余5段）<br>
    亚军：李四（业余5段）<br>
    季军：王五（业余4段）</p>
    
    <h3>赛事意义</h3>
    <p>万州围棋村超春季赛不仅是一场围棋竞技盛会，更是推广围棋文化、促进围棋交流的重要平台。通过举办这样的赛事，进一步提升了万州区围棋运动的影响力，为打造"围棋之乡"奠定了坚实基础。</p>
    
    <p>下一届万州围棋村超夏季赛将于6月举行，敬请期待！</p>
  `
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="news-detail-page">
    <div class="news-header">
      <img :src="news.image" :alt="news.title" />
      <button class="back-btn" @click="goBack">← 返回</button>
    </div>

    <div class="container">
      <article class="news-article">
        <h1 class="news-title">{{ news.title }}</h1>
        <div class="news-meta">
          <span>📅 {{ news.date }}</span>
          <span>👁️ {{ news.views }} 阅读</span>
        </div>
        <div class="news-content" v-html="news.content"></div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.news-detail-page {
  padding-bottom: 40px;
}

.news-header {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  background: var(--bg-gray);
}

.news-header img {
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

.news-article {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-top: -40px;
  position: relative;
  box-shadow: var(--shadow);
}

.news-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
  line-height: 1.4;
}

.news-meta {
  display: flex;
  gap: 20px;
  padding-bottom: 16px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  font-size: 14px;
  color: var(--text-secondary);
}

.news-content {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-primary);
}

.news-content :deep(p) {
  margin-bottom: 16px;
}

.news-content :deep(h3) {
  font-size: 20px;
  font-weight: 600;
  margin: 24px 0 12px;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .news-header {
    height: 200px;
  }

  .news-article {
    padding: 20px 16px;
  }

  .news-title {
    font-size: 20px;
  }

  .news-content {
    font-size: 15px;
  }
}
</style>

