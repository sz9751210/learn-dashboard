// 從'@/layout/index.vue'導入Layout組件，這個組件通常作為頁面的基本布局框架
import Layout from '@/layout/index.vue'

export const devopsRoutes = [
  {
    name: 'DEVOPS',
    path: '/devops',
    component: Layout,
    redirect: '/devops/roadmap',
    meta: {
      title: 'DevOps',
    },
    children: [
      // 测试页面下的具体测试项
      {
        name: 'ROADMAP',
        path: 'roadmap',
        component: () => import('@/views/devops/RoadMap.vue'),
        meta: {
          title: 'RoadMap',
        },
      },
      {
        name: 'AWESOMEDEVOPS',
        path: 'awesomedevops',
        component: () => import('@/views/devops/AwesomeDevops.vue'),
        meta: {
          title: 'Awesome Devops',
        },
      },
      {
        name: 'Blog',
        path: 'blog',
        component: () => import('@/views/devops/DevopsBlog.vue'),
        meta: {
          title: 'DevOps Blog',
        },
      },
      {
        name: 'Book List',
        path: 'book-list',
        component: () => import('@/views/devops/BookList.vue'),
        meta: {
          title: 'Book List',
        },
      },
    ],
  },
]
export default devopsRoutes
