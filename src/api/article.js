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

// 收藏
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

// 点赞
export const addLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞
export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
