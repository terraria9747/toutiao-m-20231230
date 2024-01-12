import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog, Toast } from 'vant'
import store from '@/store/'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { requiresAuth: false }
  }, {
    path: '/',
    // name: 'layout', // 如果父路由默认有子路由, 它的name没有意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 为空为默认子路由
        name: 'home',
        component: () => import('@/views/home'),
        meta: { requiresAuth: false }
      }, {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: { requiresAuth: false }
      }, {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requiresAuth: false }
      }, {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/serach',
    name: 'serach',
    component: () => import('@/views/serach'),
    meta: { requiresAuth: false }
  }, {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true, // 开启路由传参
    meta: { requiresAuth: false }
  },
  {
    path: '/my/userinfo',
    name: 'userinfo',
    component: () => import('@/views/userinfo'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user-chat',
    name: 'userchat',
    component: () => import('@/views/user-chat'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user-message',
    name: 'user-message',
    component: () => import('@/views/user-message'),
    meta: { requiresAuth: true }
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/setting'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'CollectHistory',
    component: () => import('@/views/user'),
    meta: { requiresAuth: true }
  },
  {
    path: '/userinfo2',
    name: 'LikeFans',
    component: () => import('@/views/userinfo2'),
    meta: { requiresAuth: true }
  },
  {
    path: '/basicUserInfo',
    name: 'basicUserInfo',
    component: () => import('@/views/basicUserInfo'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 判断页面是否需要登录权限
  if (to.meta.requiresAuth) {
    // 如果用户登录了 -- 放行
    if (store.state.user) {
      return next()
    }

    // 如果用户没有登录 -- 弹窗提示是否进行登录?
    Dialog.confirm({
      title: '登录提示',
      message: '此页面需要登录, 是否登录?'
    }).then(() => {
      // 确认登录
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => {
      // 取消登录 -- 禁止放行
      Toast.fail('用户取消了登录')
      // next(false)
    })
  } else {
    // 判断页面不需要登录权限
    next()
  }
})
export default router
