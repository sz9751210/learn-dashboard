// 从axios库导入axios，这是一个基于Promise的HTTP客户端，用于浏览器和node.js
import axios from 'axios'

/**
 * 创建并配置一个axios实例。
 *
 * @param {Object} option - 配置项对象。
 * @returns {axios} - 返回配置好的axios实例。
 */
function createAxios(option = {}) {
  // 获取应用全局配置中的基础API URL，如果没有配置则从环境变量中读取
  const defBaseURL = window.__APP__GLOB__CONF__?.VITE_APP_GLOB_BASE_API || import.meta.env.VITE_APP_GLOB_BASE_API
  // 使用axios.create方法创建一个新的axios实例
  const service = axios.create({
    timeout: option.timeout || 120000, // 设置请求超时时间，默认为120秒
    baseURL: option.baseURL || defBaseURL, // 设置基础URL，默认为全局配置或环境变量中的值
  })
  // 为创建的axios实例设置拦截器
  // setupInterceptor(service)
  // 返回配置好的axios实例
  return service
}

// 创建一个默认的axios实例，没有特别的配置
export const defAxios = createAxios()
