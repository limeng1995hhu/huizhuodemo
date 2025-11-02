<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const product = ref({
  id: 1,
  name: '云子围棋套装',
  price: 299,
  coins: 2990,
  image: 'https://via.placeholder.com/600x600/2c5f2d/ffffff?text=围棋套装',
  sales: 156,
  stock: 50,
  description: '精选云南云子，质地细腻，手感舒适。配套实木棋盘，适合家庭使用和学习练习。',
  specs: [
    { label: '材质', value: '云子' },
    { label: '棋盘', value: '实木' },
    { label: '尺寸', value: '标准19路' },
    { label: '重量', value: '约3kg' }
  ]
})

const paymentMethod = ref('wechat')
const showPaymentModal = ref(false)

const goBack = () => {
  router.back()
}

const buyWithCash = () => {
  paymentMethod.value = 'wechat'
  showPaymentModal.value = true
}

const buyWithCoins = () => {
  paymentMethod.value = 'coins'
  showPaymentModal.value = true
}

const confirmPurchase = () => {
  alert('购买成功！')
  showPaymentModal.value = false
  router.push('/orders')
}
</script>

<template>
  <div class="product-detail-page">
    <button class="back-btn" @click="goBack">← 返回</button>

    <div class="container">
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
      </div>

      <div class="product-main">
        <h1 class="product-name">{{ product.name }}</h1>
        <div class="product-sales">已售 {{ product.sales }} | 库存 {{ product.stock }}</div>
        
        <div class="price-section card">
          <div class="price-item">
            <span class="price-label">现金购买</span>
            <span class="price-value">¥{{ product.price }}</span>
          </div>
          <div class="price-item">
            <span class="price-label">虚拟币兑换</span>
            <span class="price-value coins">🪙 {{ product.coins }}</span>
          </div>
        </div>

        <div class="description-section card">
          <h3>商品描述</h3>
          <p>{{ product.description }}</p>
        </div>

        <div class="specs-section card">
          <h3>商品规格</h3>
          <div class="specs-list">
            <div v-for="spec in product.specs" :key="spec.label" class="spec-item">
              <span class="spec-label">{{ spec.label }}</span>
              <span class="spec-value">{{ spec.value }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="action-bar">
        <button class="buy-btn btn-outline" @click="buyWithCoins">
          🪙 虚拟币兑换
        </button>
        <button class="buy-btn btn-primary" @click="buyWithCash">
          立即购买
        </button>
      </div>
    </div>

    <!-- 支付弹窗 -->
    <div v-if="showPaymentModal" class="modal-overlay" @click="showPaymentModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>确认{{ paymentMethod === 'wechat' ? '购买' : '兑换' }}</h3>
          <button class="close-btn" @click="showPaymentModal = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="order-info">
            <div class="order-item">
              <span>商品名称</span>
              <span>{{ product.name }}</span>
            </div>
            <div class="order-item">
              <span>支付方式</span>
              <span>{{ paymentMethod === 'wechat' ? '微信支付' : '虚拟币' }}</span>
            </div>
            <div class="order-item total">
              <span>支付金额</span>
              <span class="amount">
                {{ paymentMethod === 'wechat' ? `¥${product.price}` : `🪙 ${product.coins}` }}
              </span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-outline" @click="showPaymentModal = false">取消</button>
          <button class="btn-primary" @click="confirmPurchase">确认{{ paymentMethod === 'wechat' ? '支付' : '兑换' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-page {
  padding-bottom: 100px;
}

.back-btn {
  position: sticky;
  top: 60px;
  left: 16px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  margin: 16px;
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-main {
  padding: 20px 16px;
}

.product-name {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.product-sales {
  font-size: 13px;
  color: var(--text-light);
  margin-bottom: 16px;
}

.price-section {
  margin-bottom: 16px;
}

.price-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.price-item:not(:last-child) {
  border-bottom: 1px solid var(--border-color);
}

.price-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.price-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--secondary-color);
}

.price-value.coins {
  color: var(--primary-color);
}

.description-section,
.specs-section {
  margin-bottom: 16px;
}

.description-section h3,
.specs-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.description-section p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.specs-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
}

.spec-label {
  color: var(--text-secondary);
}

.spec-value {
  color: var(--text-primary);
  font-weight: 500;
}

.action-bar {
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: white;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 12px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.buy-btn {
  flex: 1;
  padding: 14px;
  font-size: 15px;
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
  max-width: 400px;
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
}

.modal-body {
  padding: 20px;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.order-item.total {
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
  font-size: 16px;
  font-weight: 600;
}

.amount {
  color: var(--secondary-color);
  font-size: 20px;
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
}
</style>

