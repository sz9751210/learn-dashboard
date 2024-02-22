// 從'@/layout/index.vue'導入Layout組件，這個組件通常作為頁面的基本布局框架
import Layout from '@/layout/index.vue'

// 導出路由配置的數組
export default [
  {
    name: 'USER_MANAGER', // 路由名稱，用於標識路由
    path: '/user', // 路由路徑
    component: Layout, // 該路由的組件，這裡使用Layout組件作為用戶管理相關頁面的布局
    redirect: '/user/management', // 訪問/user時自動重定向到/user/management
    meta: {
      title: '用户中心', // 路由的元信息，可以包含任意屬性，在這裡定義了頁面標題和角色
      role: ['admin'], // 訪問該路由所需的用戶角色
    },
    children: [ // 子路由配置
      {
        name: 'USER', // 子路由名稱
        path: 'management', // 子路由路徑，注意這裡是相對於父路由的相對路徑
        component: () => import('@/views/user/index.vue'), // 懶加載用戶管理頁面組件
        meta: {
          title: '用户管理', // 頁面標題
          role: ['admin'], // 訪問該頁面所需的用戶角色
        },
      },
      {
        name: 'PERMISSION', // 另一個子路由名稱
        path: 'permission', // 子路由路徑
        component: () => import('@/views/user/UserPermission.vue'), // 懶加載權限管理頁面組件
        meta: {
          title: '权限管理', // 頁面標題
          role: ['admin'], // 訪問該頁面所需的用戶角色
        },
      },
    ],
  },
]
