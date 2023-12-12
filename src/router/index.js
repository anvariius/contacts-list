import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthView from '../views/AuthView.vue'
import MainView from "@/views/MainView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/',
    name: 'main',
    component: MainView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
