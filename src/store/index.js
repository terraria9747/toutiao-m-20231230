import Vue from 'vue'
import Vuex from 'vuex'
// 导入 封装本地存储的函数
import { setItem, getItem } from '@/utls/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY),

    // 缓存页面
    cachePages: ['LayoutIndex']
  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(user))
      setItem(TOKEN_KEY, state.user)
    },

    // 添加缓存页面
    addCachePage (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },

    // 移除缓存页面
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }

  },
  actions: {
  },
  modules: {
  }
})
