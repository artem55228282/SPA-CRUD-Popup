import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    
    component: () => import('../views/Home.vue')
  },
  {
    path: '/page/:page',
    name: 'home.page',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/sort/:sort/page/:page',
    name: 'home.sort.page',
    component: () => import('../views/Home.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
