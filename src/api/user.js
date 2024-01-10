// 用户请求的相关模块

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

// 获取频道列表数据
export const channelInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 关注用户
export const getfollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消用户
export const deletefollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

// 获取用户个人信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

// 编辑用户个人信息
export const updateUserInfo = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 编辑头像
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}

// 获取关注数
export const getLike = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/followings'
  })
}

// 获取粉丝数
export const getFans = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/followers'
  })
}
