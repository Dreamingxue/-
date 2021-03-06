import axios from 'axios'

let ApiUrl = 'http://nlminepool.cn:9085/app'
let prodapi = process.env.NODE_ENV === 'production' // 是否线上部署
if (prodapi) {
  ApiUrl = '/app' // 线上API服务地址直接根路径
}
axios.defaults.withCredentials = true
axios.defaults.timeout = 30 * 1000
axios.defaults.baseURL = ApiUrl
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    let storage = window.sessionStorage
    let token = storage.getItem('jwttoken')
    if (token) {
      // 这里将token设置到headers中
      axios.defaults.headers.common['Authorization'] = token
    }
    if (config.url.indexOf('?') > 0) {
      config.url = config.url + '&timestamps=' + new Date().getTime()
    } else {
      config.url = config.url + '?timestamps=' + new Date().getTime()
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export { ApiUrl, axios }
