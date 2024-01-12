import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import router from '@/router'

const request = axios.create({
  // 基础路径
  // baseURL: 'https://toutiao.itheima.net'
  baseURL: 'http://geek.itheima.net'

})

const refreshToken = axios.create({
  baseURL: 'http://geek.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求之前拦截
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 请求失败处理的代码
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  const status = error.response.status

  if (status === 400) {
    // 客户端请求参数错误
    Toast.fail('客户端请求参数错误')
  } else if (status === 401) {
    const { user } = store.state
    // 如果用户没有登录 --> 跳转到登录页面重新登陆
    if (!user || !user.refresh_token || !user.token) {
      return redirectLogin()
    }
    // 如果登录后token过期,
    // 通过refresh_token重新请求获取最新的token
    try {
      const { data } = await refreshToken({
        method: 'PUT',
        url: '/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })

      // 拿到最新的token后更新到容器中
      user.token = data.data.token
      store.commit('setUser', user)

      // 重新发送请求 error.config 本次请求的相关配置对象
      return request(error.config)
    } catch (err) {
      redirectLogin()
    }

    Toast.fail('登录过期, 无效token')
  } else if (status === 403) {
    // 没有操作权限
    Toast.fail('没有操作权限')
  } else if (status >= 500) {
    // 服务端异常
    Toast.fail('服务端异常')
  }

  return Promise.reject(error)
})

function redirectLogin () {
  // router.replace('/login')
  router.replace({
    name: 'login',
    // 查询参数 以?为分割符 填充到url中
    // router.currentRoute 当前路由对象
    // router.currentRoute.fullPath 当前路由路径
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 暴露 request
export default request
