import request from '@/utls/request'

export const ArticleList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params

  })
}
