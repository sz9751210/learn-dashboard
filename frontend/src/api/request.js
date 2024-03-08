import axios from 'axios'
import config from '../config/index.js'
const NETWORK_ERROR = '网络请求错误,请稍后重试'

const service = axios.create({
  baseURL: config.baseApi,
  // timeout: 5000,
})

// [3.1] 请求拦截器：在请求正式发出前执行
service.interceptors.request.use((req) => {
  console.log('Request Base URL:', service.defaults.baseURL)
  return req
})

// [4] 响应拦截器：请求成功后，响应返回前执行
service.interceptors.response.use((res) => {
  console.log(res)
  // [4.1] 检查响应的 code，决定是直接返回数据还是显示错误并拒绝 Promise
  const { code, data, msg } = res.data
  console.log('data', res)
  if (code === 200) {
    return data
  } else {
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

// [1] 在 request 函数内部，首先根据传入的 options 处理请求方法和参数
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() == 'get') {
    options.params = options.data
  }

  // [2] 根据环境和 mock 配置动态设置 baseURL
  let isMock = config.mock
  // console.log("isMock", isMock);
  // console.log("options.mock", typeof options.mock);
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  if (config.env == 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    console.log('service.defaults.baseURL', service.defaults.baseURL)
  }

  // [3] 发起请求。在这一步，请求拦截器被触发
  return service(options)
}

// 将 request 函数作为默认导出
export default request
