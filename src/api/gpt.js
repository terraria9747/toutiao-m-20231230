import axios from 'axios'

const request = axios.create({})

// 聊天
export const getSpoken = spoken => {
  return request({
    method: 'get',
    url: 'http://ajax-api.itheima.net/api/robot',
    params: {
      spoken: spoken
    }
  })
}
