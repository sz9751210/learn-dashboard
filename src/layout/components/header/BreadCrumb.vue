<script setup>
// 從 'naive-ui' 導入面包屑組件
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
// 使用 vue-router 的 useRouter 鉤子來操作路由
import { useRouter } from 'vue-router'

// 獲取路由實例
const router = useRouter()
// 從路由實例中解構出當前路由對象
const { currentRoute } = router

// 定義處理面包屑點擊的函數，用於跳轉到對應的路由
function handleBreadClick(path) {
  // 如果點擊的路徑就是當前路徑，則不進行任何操作
  if (path === currentRoute.value.path) return
  // 使用 router.push 方法跳轉到指定路徑
  router.push(path)
}
</script>

<template>
  <!-- 渲染面包屑組件 -->
  <n-breadcrumb>
    <!-- 使用 v-for 指令遍歷當前路由對象的 matched 屬性來動態生成面包屑項 -->
    <!-- 每個面包屑項綁定一個點擊事件，用於處理路由跳轉 -->
    <n-breadcrumb-item v-for="item in currentRoute.matched" :key="item.path" @click="handleBreadClick(item.path)">
      <!-- 顯示面包屑項的標題，這裡假設每個路由的元信息中包含了 title 屬性 -->
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
