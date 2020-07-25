import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/login/login'),
    },
    {
      path: '/welcome',
      name: 'MainPage',
      component: MainPage,
      children:[
        {
          path:'index',
          component: () => import('@/pages/authUser/list'),
        }
      ]
    },
    {
      path: '/pages/authUser',
      name: '用户管理',
      component:MainPage,
      children:[
        {
          path: 'list',
          component: () => import('@/pages/authUser/list')
        }
      ]
    },
    {
      path: '/pages/authRole',
      name: '角色管理',
      component:MainPage,
      children:[
        {
          path: 'list',
          component: () => import('@/pages/authUser/list')
        }
      ]
    }
  ]
})
