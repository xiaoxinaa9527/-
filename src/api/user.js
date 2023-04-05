import request from '@/utils/request'
// 登录请求
export const loginAPI = (data) => {
  return request.post('/auth/login', data)
}
// 获取管理员信息
export const getUser = () => {
  return request.get('/auth/currentUser')
}
// 获取最近一周每天的访问数据
export const getLineData = () => {
  return request.get('/analysis/DailyVisitTrend')
}
