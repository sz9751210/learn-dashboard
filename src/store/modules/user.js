// 从pinia库导入defineStore方法，用于创建一个新的状态存储
import { defineStore } from 'pinia'
// 导入getUser API，用于从后端获取用户信息
import { getUser } from '@/api/user'
// 导入removeToken工具函数，用于在用户登出时清除本地存储的认证token
import { removeToken } from '@/utils/token'

// 使用defineStore定义一个名为"user"的状态存储
export const useUserStore = defineStore('user', {
  // 定义存储的状态（state）
  state() {
    return {
      // userInfo初始状态为空对象，用于存储用户信息
      userInfo: {},
    }
  },
  // 定义存储的计算属性（getters）
  getters: {
    // userId：返回用户ID，如果userInfo中没有id，则返回undefined
    userId() {
      return this.userInfo?.id
    },
    // name：返回用户名称，如果userInfo中没有name，则返回undefined
    name() {
      return this.userInfo?.name
    },
    // avatar：返回用户头像，如果userInfo中没有avatar，则返回undefined
    avatar() {
      return this.userInfo?.avatar
    },
    // role：返回用户角色，如果userInfo中没有role，则默认返回空数组
    role() {
      return this.userInfo?.role || []
    },
  },
  // 定义存储的动作（actions），用于执行异步操作或修改状态
  actions: {
    // 异步获取用户信息并更新userInfo状态
    async getUserInfo() {
      try {
        // 调用API获取用户信息
        const res = await getUser()
        // 如果请求成功（假设成功的code为0）
        if (res.code === 0) {
          // 解构响应中的数据
          const { id, name, avatar, role } = res.data
          // 更新userInfo状态
          this.userInfo = { id, name, avatar, role }
          // 返回成功的响应数据
          return Promise.resolve(res.data)
        } else {
          // 如果请求不成功，返回一个reject的Promise，包含错误信息
          return Promise.reject(res.message)
        }
      } catch (error) {
        // 捕获并处理请求过程中的错误
        console.error(error)
        return Promise.reject(error.message)
      }
    },
    // 用户登出的动作
    logout() {
      // 调用removeToken清除本地存储的token
      removeToken()
      // 重置userInfo状态为初始状态
      this.userInfo = {}
    },
  },
})
