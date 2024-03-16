// 從'@/layout/index.vue'導入Layout組件，這個組件通常作為頁面的基本布局框架
import Layout from '@/layout/index.vue'
import { LogoDocker } from '@vicons/ionicons5'

export const dockerRoutes = [
  {
    name: 'DOCKER',
    path: '/docker',
    component: Layout,
    redirect: '/docker/container',
    meta: {
      title: 'Docker',
      icon: LogoDocker,
    },
    children: [
      // 测试页面下的具体测试项
      {
        name: 'CONTAINER',
        path: 'container',
        component: () => import('@/views/docker/DockerContainer.vue'),
        meta: {
          title: 'Docker Container',
        },
      },
      {
        name: 'IMAGES',
        path: 'images',
        component: () => import('@/views/docker/DockerImage.vue'),
        meta: {
          title: 'Docker Images',
        },
      },
    ],
  },
]
export default dockerRoutes
