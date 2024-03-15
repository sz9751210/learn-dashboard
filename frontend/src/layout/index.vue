<script setup>
// 从 'naive-ui' 中导入所需的布局组件
import { NLayout, NLayoutHeader, NLayoutSider } from 'naive-ui'
import { computed } from 'vue'
// 从本地组件中导入应用的头部、侧边导航和主内容组件
import AppHeader from './components/header/index.vue'
import SideMenu from './components/sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()

const siderWidth = computed(() => (appStore.isCollapse ? '50px' : '200px'))
console.log(siderWidth.value)
</script>

<template>
  <div class="layout">
    <!-- 使用 NLayout 创建一个具有侧边栏的布局 -->
    <n-layout has-sider position="absolute">
      <!-- 侧边栏部分，设置固定宽度和收缩宽度 -->
      <n-layout-sider
        bordered
        :collapsed="appStore.isCollapse"
        collapse-mode="width"
        :collapsed-width="60"
        :width="240"
        :native-scrollbar="false"
      >
        <!-- 侧边栏菜单组件 -->
        <side-menu />
      </n-layout-sider>
      <!-- 主布局部分 -->
      <n-layout>
        <!-- 顶部导航区域，设置高度和背景色 -->
        <n-layout-header style="height: 100px; background-color: #f5f6fb">
          <!-- 头部组件 -->
          <app-header />
        </n-layout-header>
        <!-- 主内容区域，绝对定位，设置内边距和背景色 -->
        <n-layout
          position="absolute"
          content-style="padding: 0 35px 35px"
          style="top: 100px; background-color: #f5f6fb"
          :native-scrollbar="false"
        >
          <!-- 主内容组件 -->
          <app-main />
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>
<style scoped>
::v-deep .n-layout-toggle-button {
  /* 自定义触发器样式 */
  background-color: #0c8243; /* 示例：修改背景颜色 */
  color: rgb(255, 255, 255); /* 示例：修改图标颜色 */
  top: 100px;
}
</style>
