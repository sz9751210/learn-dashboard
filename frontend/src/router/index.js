// 从vue-router包中导入createRouter和createWebHistory函数
// createRouter用于创建路由器实例，createWebHistory用于指定路由的模式（这里是HTML5历史模式）
import { createRouter, createWebHistory } from 'vue-router'
// 从当前目录下的guard.js文件中导入setupRouterGuard函数，用于设置路由守卫
import { setupRouterGuard } from './guard'
// 从当前目录下的routes.js文件中导入basicRoutes数组，这是基础路由配置
import { basicRoutes } from './routes'

// 定义一个名为WHITE_NAME_LIST的数组，包含不需要重置的路由名称
const WHITE_NAME_LIST = ['Login', 'ErrorPage'] // 假设值，需根据实际情况调整

// 使用createRouter创建路由器实例
export const router = createRouter({
  // 使用createWebHistory创建HTML5历史模式的路由，传入的'/'是基路径
  history: createWebHistory('/'),
  // 路由配置，这里使用了从./routes导入的基础路由配置
  routes: basicRoutes,
  // scrollBehavior定义了路由切换时页面滚动行为，这里设置为始终滚动到页面顶部
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 定义一个函数resetRouter，用于重置路由器中的动态路由
export function resetRouter() {
  // 遍历当前路由器中的所有路由
  router.getRoutes().forEach((route) => {
    // 从路由对象中解构出路由名称
    const { name } = route
    // 检查路由名称是否存在且不在白名单中
    if (name && !WHITE_NAME_LIST.includes(name)) {
      // 如果路由已存在，则从路由器中移除该路由
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// 定义一个函数setupRouter，用于将路由器实例安装到Vue应用中
export function setupRouter(app) {
  // 使用app.use方法安装路由器
  app.use(router)
  // 调用setupRouterGuard函数设置路由守卫
  setupRouterGuard(router)
}
