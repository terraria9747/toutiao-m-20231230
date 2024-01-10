import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }, {
    path: '/',
    // name: 'layout', // 如果父路由默认有子路由, 它的name没有意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 为空为默认子路由
        name: 'home',
        component: () => import('@/views/home')
      }, {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      }, {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      }, {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/serach',
    name: 'serach',
    component: () => import('@/views/serach')
  }, {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true // 开启路由传参
  },
  {
    path: '/my/userinfo',
    name: 'userinfo',
    component: () => import('@/views/userinfo')
  },
  {
    path: '/user-chat',
    name: 'userchat',
    component: () => import('@/views/user-chat')
  },
  {
    path: '/user-message',
    name: 'user-message',
    component: () => import('@/views/user-message')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/setting')
  },
  {
    path: '/user',
    name: 'CollectHistory',
    component: () => import('@/views/user')
  },
  {
    path: '/userinfo2',
    name: 'LikeFans',
    component: () => import('@/views/userinfo2')
  },
  {
    path: '/basicUserInfo',
    name: 'basicUserInfo',
    component: () => import('@/views/basicUserInfo')
  }
]

const router = new VueRouter({
  routes
})

export default router
