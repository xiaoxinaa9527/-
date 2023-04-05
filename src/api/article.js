import request from '@/utils/request'

// 获取面试题列表
export const articleList = (params) => {
  return request.get('/admin/interview/query', {
    params: params
  })
}

// 添加面试题
export const createArticle = data => {
  return request.post('/admin/interview/create', data)
}

// 删除
export const removeArticle = (id) => {
  return request({
    method: 'DELETE',
    url: '/admin/interview/remove',
    data: { id }
  })
}

// 根据id获取一个面试题详情
export const getArticleDetail = id => {
  return request.get('/admin/interview/show', {
    params: {
      id
    }
  })
}

// 更新面试题
export const updateArticle = data => {
  return request.put('/admin/interview/update', data)
}
