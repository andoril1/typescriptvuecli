import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:id?/FAQ',
    name: 'FAQ',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FAQView.vue')
  },
  {
    path: '/:id?/blocks',
    name: 'blocks',
    component: () => import('@/views/BlocksView.vue')
  },
  {
    path: '/:id?/connect',
    name: 'connect',
    component: () => import('@/views/ConnectView.vue')
  },
  {
    path: '/:id?/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashBoardView.vue')
  },
  {
    path: '/:id?/miners',
    name: 'miners',
    component: () => import('@/views/MinersView.vue')
  },
  {
    path: '/:id?/payments',
    name: 'payments',
    component: () => import('@/views/PaymentsView.vue')
  },
  {
    path: '/:id?/stats',
    name: 'stats',
    component: () => import('@/views/StatsView.vue')
  },
  {
    path: '/:id?/support',
    name: 'support',
    component: () => import('@/views/SupportView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
