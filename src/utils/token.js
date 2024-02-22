// 导入自定义的用于操作localStorage的工具函数
import { createLocalStorage } from './cache'
// 导入用于从服务器刷新令牌的API函数
import { refreshToken } from '@/api/auth'

// 定义存储在localStorage中的令牌的键名
const TOKEN_CODE = 'access_token'
// 定义令牌的有效期，这里设置为6小时（以秒为单位）
const DURATION = 6 * 60 * 60

// 使用createLocalStorage创建一个操作localStorage的实例
export const lsToken = createLocalStorage()

// 定义getToken函数用于从localStorage中获取令牌
export function getToken() {
  return lsToken.get(TOKEN_CODE)
}

// 定义setToken函数用于将令牌保存到localStorage中，同时设置有效期
export function setToken(token) {
  lsToken.set(TOKEN_CODE, token, DURATION)
}

// 定义removeToken函数用于从localStorage中移除令牌
export function removeToken() {
  lsToken.remove(TOKEN_CODE)
}

// 定义refreshAccessToken函数用于刷新令牌
export async function refreshAccessToken() {
  // 从localStorage中获取令牌及其存储时间
  const tokenItem = lsToken.getItem(TOKEN_CODE)
  // 如果localStorage中没有令牌，直接返回
  if (!tokenItem) {
    return
  }
  const { time } = tokenItem
  // 如果当前时间与令牌存储时间的差值超过30分钟，则尝试刷新令牌
  if (new Date().getTime() - time > 1000 * 60 * 30) {
    try {
      // 调用API函数从服务器刷新令牌
      const res = await refreshToken()
      // 如果刷新成功（假设成功的code为0），则更新localStorage中的令牌
      if (res.code === 0) {
        setToken(res.data.token)
      }
    } catch (error) {
      // 如果刷新令牌过程中发生错误，打印错误信息
      console.error(error)
    }
  }
}
