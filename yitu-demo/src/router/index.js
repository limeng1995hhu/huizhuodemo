import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('../views/Events.vue')
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: () => import('../views/EventDetail.vue')
  },
  {
    path: '/learning',
    name: 'Learning',
    component: () => import('../views/Learning.vue')
  },
  {
    path: '/learning/ai-game',
    name: 'AIGame',
    component: () => import('../views/AIGame.vue')
  },
  {
    path: '/learning/pvp-game',
    name: 'PVPGame',
    component: () => import('../views/PVPGame.vue')
  },
  {
    path: '/learning/practice',
    name: 'Practice',
    component: () => import('../views/Practice.vue')
  },
  {
    path: '/learning/videos',
    name: 'Videos',
    component: () => import('../views/Videos.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue')
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: () => import('../views/NewsDetail.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/Shop.vue')
  },
  {
    path: '/shop/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router

