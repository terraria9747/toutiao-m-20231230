import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 基础路径
  baseURL: 'https://toutiao.itheima.net'
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

// 暴露 request
export default request
