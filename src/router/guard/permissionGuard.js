// 导入用户和权限状态管理store
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
// 导入未找到路由的配置
import { NOT_FOUND_ROUTE } from '@/router/routes'
// 导入token相关的工具函数
import { getToken, refreshAccessToken, removeToken } from '@/utils/token'

// 定义一个白名单数组，不需要权限即可访问的路由路径
const WHITE_LIST = ['/login', '/redirect']

// 定义createPermissionGuard函数，用于创建路由守卫
export function createPermissionGuard(router) {
  // 使用Pinia store
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  // 为router添加beforeEach全局前置守卫
  router.beforeEach(async (to, from, next) => {
    // 获取当前用户的token
    const token = getToken()

    // 如果用户有token
    if (token) {
      // 如果正在访问登录页面，则重定向到首页
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        // 如果用户ID已存在，即用户信息已获取
        if (userStore.userId) {
          // 刷新AccessToken
          refreshAccessToken()
          next()
        } else {
          // 尝试获取用户信息
          try {
            await userStore.getUserInfo()
            // 根据用户角色生成可访问路由表
            const accessRoutes = permissionStore.generateRoutes(userStore.role)
            // 遍历并添加这些路由到router中
            accessRoutes.forEach((route) => {
              if (!router.hasRoute(route.name)) {
                router.addRoute(route)
              }
            })
            // 添加未找到路由的处理
            router.addRoute(NOT_FOUND_ROUTE)
            // 重定向到目标路由（确保添加路由生效）
            next({ ...to, replace: true })
          } catch (error) {
            // 如果获取用户信息失败，移除token并重定向到登录页面
            removeToken()
            // 显示错误信息
            $message.error(error)
            // 重定向到登录页面，并附带重定向前的路由路径
            next({ path: '/login', query: { ...to.query, redirect: to.path } })
          }
        }
      }
    } else {
      // 如果没有token，检查是否在白名单中
      if (WHITE_LIST.includes(to.path)) {
        // 如果在白名单中，直接进入
        next()
      } else {
        // 不在白名单中，重定向到登录页面
        next({ path: '/login', query: { ...to.query, redirect: to.path } })
      }
    }
  })
}
