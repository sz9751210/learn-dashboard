import Layout from '@/layout/index.vue'
import Dashboard from '@/views/dashboard/index.vue'
import devopsRoutes from './modules/devops'
import NotFound from '@/views/error-page/404.vue'

// 基础路由配置数组，包含了应用中的一些基本路由
export const basicRoutes = [
  // 404错误页面路由
  {
    name: '404', // 路由名称
    path: '/:pathMatch(.*)*', // 访问路径
    component: Layout,
    isHidden: true, // 自定义属性，用于判断该路由是否在侧边栏中
    children: [
      {
        name: 'NotFound', // 子路由名称
        path: '', // 子路由路径
        component: () => import('@/views/error-page/404.vue'), // 懒加载404页面组件
      },
    ],
  },
  // 重定向功能路由
  {
    name: 'REDIRECT',
    path: '/redirect',
    component: Layout, // 使用Layout组件作为布局框架
    isHidden: true,
    children: [
      {
        name: 'REDIRECT_NAME', // 子路由名称
        path: '', // 子路由路径
        component: () => import('@/views/redirect/index.vue'), // 重定向页面组件
      },
    ],
  },
  // 首页路由
  {
    name: 'HOME',
    path: '/',
    component: Layout,
    redirect: '/dashboard', // 访问根路径时重定向到/dashboard
    meta: {
      title: '首頁',
    },
    children: [
      {
        name: 'DASHBOARD',
        path: 'dashboard',
        component: Dashboard,
        meta: {
          title: 'Dashboard',
        },
      },
    ],
  },
  // devops路由，包含了多个子路由
  ...devopsRoutes,
]

// 当访问的路由不存在时，重定向到404页面
export const NOT_FOUND_ROUTE = {
  name: 'NOT_FOUND',
  path: '/:pathMatch(.*)*', // 捕获所有不匹配的路由
  redirect: '/404',
  isHidden: true,
}

// 使用import.meta.globEager批量导入路由模块
const modules = import.meta.globEager('./modules/*.js')
// 定义一个数组用于存储异步加载的路由
const asyncRoutes = []
// 遍历导入的路由模块，并将每个模块的默认导出（即路由配置数组）添加到asyncRoutes数组中
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(...modules[key].default)
})

// 导出asyncRoutes
export { asyncRoutes }
