<script setup>
import { NGradientText, NIcon } from 'naive-ui'
import { Chalkboard } from '@vicons/fa'
import { useAppStore } from '@/store/modules/app'
const title = import.meta.env.VITE_APP_TITLE
const appStore = useAppStore()
</script>

<template>
  <div class="logo">
    <n-icon size="35" color="#316c72">
      <chalkboard />
    </n-icon>
    <router-link v-if="!appStore.isCollapse" to="/">
      <n-gradient-text type="primary">{{ title }}</n-gradient-text>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    margin-left: 5px;
    .n-gradient-text {
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
