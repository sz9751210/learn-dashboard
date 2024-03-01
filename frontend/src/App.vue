<!-- 使用<script setup>語法糖定義組件的設置，這種語法糖允許我們在單文件組件(SFC)中更方便地使用組合式API -->
<script setup>
// 從 '@/components/AppProvider/index' 導入 AppProvider 組件
import AppProvider from '@/components/AppProvider/index.vue'
</script>

<template>
  <!-- router-view 用於顯示與當前路由地址相匹配的視圖 -->
  <router-view>
    <!-- 定義一個默認的插槽，使用解構賦值從插槽的屬性中提取 Component 和 route 對象 -->
    <template #default="{ Component, route }">
      <!-- AppProvider 組件作為容器，用於封裝後代組件並提供上下文 -->
      <app-provider>
        <!-- 使用 keep-alive 包裹 component 組件，只有當 route.meta.keepAlive 為真時才啟用緩存 -->
        <!-- :is 屬性用於動態組件，根據 route.fullPath 的不同渲染不同的組件 -->
        <keep-alive v-if="route.meta && route.meta.keepAlive">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <!-- 當不需要 keep-alive 時，直接渲染 component 組件 -->
        <component :is="Component" v-else :key="route.fullPath" />
      </app-provider>
    </template>
  </router-view>
</template>

<style lang="scss">
/* 定義樣式，使 app 容器高度為100% */
#app {
  height: 100%;
  /* 繼承高度設置給 n-config-provider，這可能是一個內部或外部組件的類名 */
  .n-config-provider {
    height: inherit;
  }
}
</style>
