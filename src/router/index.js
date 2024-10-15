import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/oficios',
    name: 'oficios',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OficiosView.vue')
  },
  {
    path: '/causaaprueba',
    name: 'causaaprueba',
    component: () => import(/* webpackChunkName: "about" */ '../views/CausaAPrueba.vue')
  },
  {
    path: '/demandanueva',
    name: 'demandanueva',
    component: () => import(/* webpackChunkName: "about" */ '../views/DemandaNuevaView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
