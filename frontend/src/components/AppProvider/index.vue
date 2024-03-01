<script setup>
// 從 'naive-ui' 導入所需組件，這些組件提供了應用的基本UI結構和功能
import { NConfigProvider, NGlobalStyle, NLoadingBarProvider, NMessageProvider, NDialogProvider } from 'naive-ui'

// 導入應用特定的組件，這些組件可能是對話框、消息內容或加載條的自定義實現
import MessageContent from './MessageContent.vue'
import DialogContent from './DialogContent.vue'
import LoadingBar from './LoadingBar.vue'

// 使用Vuex的方式導入app模塊的狀態管理，以便在組件中訪問和使用應用的狀態
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
</script>

<template>
  <!-- NConfigProvider 組件用於提供 Naive UI 的配置，如主題覆蓋 -->
  <n-config-provider :theme-overrides="appStore.themeOverrides">
    <!-- NGlobalStyle 組件用於設置全局樣式 -->
    <n-global-style />
    <!-- NLoadingBarProvider 組件提供了一個上下文，使得加載條可以在應用的任何地方控制 -->
    <n-loading-bar-provider>
      <!-- 加載條組件的自定義實現 -->
      <loading-bar />
      <!-- NDialogProvider 組件提供了一個對話框的上下文，用於全局控制對話框的顯示 -->
      <n-dialog-provider>
        <!-- 對話框內容的自定義實現 -->
        <dialog-content />
        <!-- NMessageProvider 組件提供了消息提示的上下文，用於全局控制消息提示的顯示 -->
        <n-message-provider>
          <!-- 消息內容的自定義實現 -->
          <message-content />
          <!-- 預留一個插槽，用於在需要時插入額外的內容 -->
          <slot name="default"></slot>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
