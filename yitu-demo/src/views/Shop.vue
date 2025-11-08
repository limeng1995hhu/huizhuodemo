<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '../assets/logo.jpg'

const router = useRouter()

const activeCategory = ref('all')

const categories = [
  { key: 'all', label: '全部' },
  { key: 'equipment', label: '围棋器具' },
  { key: 'cultural', label: '文创周边' },
  { key: 'materials', label: '学习耗材' }
]

const products = ref([
  {
    id: 1,
    name: '云子围棋套装',
    category: 'equipment',
    price: 299,
    coins: 2990,
    image: logoImg,
    sales: 156,
    stock: 50
  },
  {
    id: 2,
    name: '围棋文化T恤',
    category: 'cultural',
    price: 89,
    coins: 890,
    image: logoImg,
    sales: 328,
    stock: 100
  },
  {
    id: 3,
    name: '围棋定式手册',
    category: 'materials',
    price: 45,
    coins: 450,
    image: logoImg,
    sales: 89,
    stock: 200
  },
  {
    id: 4,
    name: '实木围棋盘',
    category: 'equipment',
    price: 599,
    coins: 5990,
    image: logoImg,
    sales: 45,
    stock: 20
  },
  {
    id: 5,
    name: '围棋主题帆布袋',
    category: 'cultural',
    price: 39,
    coins: 390,
    image: logoImg,
    sales: 267,
    stock: 150
  },
  {
    id: 6,
    name: '围棋习题集',
    category: 'materials',
    price: 68,
    coins: 680,
    image: logoImg,
    sales: 134,
    stock: 80
  }
])

const filteredProducts = ref([])

const filterProducts = () => {
  if (activeCategory.value === 'all') {
    filteredProducts.value = products.value
  } else {
    filteredProducts.value = products.value.filter(p => p.category === activeCategory.value)
  }
}

const goToDetail = (id) => {
  router.push(`/shop/${id}`)
}

filterProducts()
</script>

<template>
  <div class="shop-page">
    <div class="container">
      <h1 class="page-title">围棋商城</h1>

      <!-- 分类标签 -->
      <div class="categories">
        <button
          v-for="category in categories"
          :key="category.key"
          class="category-btn"
          :class="{ active: activeCategory === category.key }"
          @click="activeCategory = category.key; filterProducts()"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- 商品列表 -->
      <div class="products-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
          @click="goToDetail(product.id)"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info">
            <h4 class="product-name">{{ product.name }}</h4>
            <div class="product-sales">已售 {{ product.sales }}</div>
            <div class="product-price">
              <div class="price-row">
                <span class="price-label">现金</span>
                <span class="price-value">¥{{ product.price }}</span>
              </div>
              <div class="price-row coins">
                <span class="price-label">🪙</span>
                <span class="price-value">{{ product.coins }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredProducts.length === 0" class="empty-state">
        <div class="empty-icon">🛒</div>
        <p>该分类暂无商品</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shop-page {
  padding: 20px 0;
  min-height: 100vh;
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
  padding: 8px 20px;
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #f5f5f5;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 12px;
}

.product-name {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-sales {
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 8px;
}

.product-price {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.price-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--secondary-color);
}

.price-row.coins .price-value {
  color: var(--primary-color);
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
  .products-grid {
    gap: 12px;
  }

  .product-name {
    font-size: 14px;
  }
}
</style>

