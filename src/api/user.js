// 用户请求的相关模块

// import store from "@/store";
import request from '@/utls/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息
export const userInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}
