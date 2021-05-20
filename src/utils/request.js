/*
* 请求模块
* */
import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  console.log(user)
  return config
}, function (error) {
  return Promise.reject(error)
})
// 导出
export default request
