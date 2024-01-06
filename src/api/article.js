import request from '@/utls/request'
import JSONBig from 'json-bigint'

// 获取文章的id数据
export const ArticleList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}

// 根据id获取文章详细信息
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`,

    // 自定义后端返回的原始数据
    // 默认JSON.parse()
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }
    }]
  })
}
