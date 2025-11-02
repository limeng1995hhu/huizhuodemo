<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const orders = ref([
  {
    id: 'ORD20240315001',
    productName: '云子围棋套装',
    productImage: 'https://via.placeholder.com/100x100/2c5f2d/ffffff?text=套装',
    price: 299,
    paymentMethod: '微信支付',
    status: 'shipped',
    statusText: '已发货',
    orderTime: '2024-03-15 10:30',
    trackingNumber: 'SF1234567890'
  },
  {
    id: 'ORD20240310002',
    productName: '围棋文化T恤',
    productImage: 'https://via.placeholder.com/100x100/4a90e2/ffffff?text=T恤',
    price: 0,
    coins: 890,
    paymentMethod: '虚拟币兑换',
    status: 'completed',
    statusText: '已完成',
    orderTime: '2024-03-10 15:20'
  },
  {
    id: 'ORD20240308003',
    productName: '围棋定式手册',
    productImage: 'https://via.placeholder.com/100x100/9c27b0/ffffff?text=手册',
    price: 45,
    paymentMethod: '微信支付',
    status: 'pending',
    statusText: '待发货',
    orderTime: '2024-03-08 09:15'
  }
])

const goBack = () => {
  router.back()
}

const viewDetail = (order) => {
  alert(`查看订单详情：${order.id}`)
}
</script>

<template>
  <div class="orders-page">
    <div class="container">
      <button class="back-btn" @click="goBack">← 返回</button>
      
      <h1 class="page-title">我的订单</h1>

      <div class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card card">
          <div class="order-header">
            <span class="order-id">订单号：{{ order.id }}</span>
            <span class="order-status" :class="`status-${order.status}`">
              {{ order.statusText }}
            </span>
          </div>

          <div class="order-content">
            <img :src="order.productImage" :alt="order.productName" class="product-image" />
            <div class="product-info">
              <h4 class="product-name">{{ order.productName }}</h4>
              <div class="product-price">
                <span v-if="order.price > 0">¥{{ order.price }}</span>
                <span v-else>🪙 {{ order.coins }}</span>
              </div>
              <div class="payment-method">{{ order.paymentMethod }}</div>
            </div>
          </div>

          <div class="order-footer">
            <div class="order-time">下单时间：{{ order.orderTime }}</div>
            <div v-if="order.trackingNumber" class="tracking-number">
              物流单号：{{ order.trackingNumber }}
            </div>
          </div>

          <div class="order-actions">
            <button class="action-btn btn-outline" @click="viewDetail(order)">
              查看详情
            </button>
            <button v-if="order.status === 'shipped'" class="action-btn btn-primary">
              确认收货
            </button>
            <button v-if="order.status === 'completed'" class="action-btn btn-outline">
              再次购买
            </button>
          </div>
        </div>
      </div>

      <div v-if="orders.length === 0" class="empty-state">
        <div class="empty-icon">📦</div>
        <p>暂无订单</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders-page {
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

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-card {
  padding: 16px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.order-id {
  font-size: 13px;
  color: var(--text-secondary);
}

.order-status {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 12px;
}

.status-pending {
  background: #fff3e0;
  color: #ff9800;
}

.status-shipped {
  background: #e3f2fd;
  color: #2196f3;
}

.status-completed {
  background: #e8f5e9;
  color: #4caf50;
}

.order-content {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.product-price {
  font-size: 16px;
  font-weight: 700;
  color: var(--secondary-color);
}

.payment-method {
  font-size: 12px;
  color: var(--text-light);
}

.order-footer {
  padding: 12px 0;
  border-top: 1px solid var(--border-color);
  font-size: 12px;
  color: var(--text-secondary);
}

.tracking-number {
  margin-top: 4px;
}

.order-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.action-btn {
  flex: 1;
  padding: 10px;
  font-size: 14px;
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
</style>

