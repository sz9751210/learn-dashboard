// 從'@/layout/index.vue'導入Layout組件，這個組件通常作為頁面的基本布局框架
import Layout from '@/layout/index.vue'
import { AppsSharp } from '@vicons/ionicons5'

export const k8sRoutes = [
  {
    name: 'KUBERNETES',
    path: '/k8s',
    component: Layout,
    redirect: '/k8s/cluster',
    meta: {
      title: 'K8s',
      icon: AppsSharp,
    },
    children: [
      // 测试页面下的具体测试项
      {
        name: 'CLUSTER',
        path: 'cluster',
        component: () => import('@/views/k8s/ClusterInfo.vue'),
        meta: {
          title: 'cluster',
        },
      },
      {
        name: 'WORKLOAD',
        path: 'workload',
        component: () => import('@/views/k8s/TestA.vue'),
        meta: {
          title: 'workload',
        },
      },
    ],
  },
]
export default k8sRoutes
