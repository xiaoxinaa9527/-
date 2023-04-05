import axios from 'axios'
import store from '@/store'

// 创建一个新的 axios实例（相当于克隆一份）
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // config.headers.Authorization = token值
    config.headers.Authorization = 'Bearer ' + store.state.user.token
    return config
  },
  (error) => Promise.reject(error)
)

// 添加响应拦截器
request.interceptors.response.use(
  // 响应拦截器中，直接将真实的服务器响应结果返回。后面再获取结果的时候就不用解构了
  (response) => response.data,
  (error) => {
    return Promise.reject(error)
  }
)

// 导出配置好的 axios（也就是 request）
export default request
