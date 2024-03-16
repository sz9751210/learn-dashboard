// 從'@/layout/index.vue'導入Layout組件，這個組件通常作為頁面的基本布局框架
import Layout from '@/layout/index.vue'
import { Attach, Book, LogoGithub, Infinite, Map, Library, Link, LockClosed } from '@vicons/ionicons5'

export const devopsRoutes = [
  {
    name: 'DEVOPS',
    path: '/devops',
    component: Layout,
    redirect: '/devops/roadmap',
    meta: {
      title: 'DevOps',
      icon: Infinite,
    },
    children: [
      // 测试页面下的具体测试项
      {
        name: 'ROADMAP',
        path: 'roadmap',
        component: () => import('@/views/devops/RoadMap.vue'),
        meta: {
          title: 'RoadMap',
          icon: Map,
        },
      },
      {
        name: 'AWESOMEDEVOPS',
        path: 'awesomedevops',
        component: () => import('@/views/devops/AwesomeDevops.vue'),
        meta: {
          title: 'Awesome Devops',
          icon: LogoGithub,
        },
      },
      {
        name: 'Blog',
        path: 'blog',
        component: () => import('@/views/devops/DevopsBlog.vue'),
        meta: {
          title: 'DevOps Blog',
          icon: Link,
        },
      },
      {
        name: 'Book List',
        path: 'book-list',
        component: () => import('@/views/devops/BookList.vue'),
        meta: {
          title: 'Book List',
          icon: Library,
        },
      },
      {
        name: 'SSL certificate',
        path: 'ssl-certificate',
        component: () => import('@/views/devops/SSLCertificate.vue'),
        meta: {
          title: 'SSL Certificate',
          icon: LockClosed,
        },
      },
    ],
  },
]
export default devopsRoutes
