import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '主页',
      component: MainPage,
      children: [
        {
          path: '/pages/home/welcome',
          component: () => import('@/pages/home/welcome')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/pages/login/login'),
    },

  ]
})
