// 从pinia库中导入defineStore函数，用于创建状态管理库
import { defineStore } from 'pinia'
// 从路由配置文件中导入所有异步路由和基础路由
import { asyncRoutes, basicRoutes } from '@/router/routes'
// 从lodash-es库中导入difference函数，用于比较两个数组的差异
import { difference } from 'lodash-es'

// 定义hasPermission函数，用于判断给定的角色是否有权限访问某个路由
function hasPermission(route, role) {
  // 从路由元数据中获取该路由所需的角色
  const routeRole = route.meta?.role ? route.meta.role : []
  // 如果用户角色数组或路由角色数组为空，则认为没有权限
  if (!role.length || !routeRole.length) {
    return false
  }
  // 如果路由角色数组与用户角色数组的差异小于路由角色数组的长度，表示有部分角色匹配，即有权限
  return difference(routeRole, role).length < routeRole.length
}

// 定义filterAsyncRoutes函数，用于根据用户角色过滤出可访问的异步路由
function filterAsyncRoutes(routes = [], role) {
  const ret = []
  // 遍历路由数组
  routes.forEach((route) => {
    // 如果当前路由有权限被访问
    if (hasPermission(route, role)) {
      // 拷贝当前路由对象，初始化子路由为空数组
      const curRoute = {
        ...route,
        children: [],
      }
      // 如果当前路由有子路由，递归过滤子路由
      if (route.children && route.children.length) {
        curRoute.children = filterAsyncRoutes(route.children, role)
      } else {
        // 如果没有子路由，删除children属性
        Reflect.deleteProperty(curRoute, 'children')
      }
      // 将过滤后的路由添加到结果数组
      ret.push(curRoute)
    }
  })
  // 返回过滤后的路由数组
  return ret
}

// 使用defineStore定义一个名为'permission'的状态管理库
export const usePermissionStore = defineStore('permission', {
  // 定义状态
  state() {
    return {
      // 存储可访问的异步路由
      accessRoutes: [],
    }
  },
  // 定义计算属性
  getters: {
    // 计算所有路由（基础路由+可访问的异步路由）
    routes() {
      return basicRoutes.concat(this.accessRoutes)
    },
  },
  // 定义动作
  actions: {
    // 根据用户角色生成可访问的路由列表
    generateRoutes(role = []) {
      // 过滤出可访问的异步路由
      const accessRoutes = filterAsyncRoutes(asyncRoutes, role)
      // 更新状态中的accessRoutes
      this.accessRoutes = accessRoutes
      // 返回可访问的异步路由列表
      return accessRoutes
    },
  },
})
