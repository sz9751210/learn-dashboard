<script setup>
// 從Vuex存儲中導入用戶模塊，用於管理用戶狀態（如登入、登出）
import { useUserStore } from '@/store/modules/user'
// 從vue-router導入useRouter，用於在腳本中操作路由
import { useRouter } from 'vue-router'
// 從naive-ui導入NDropdown，一個用於顯示下拉菜單的組件
import { NDropdown } from 'naive-ui'

// 使用useUserStore來操作用戶狀態
const userStore = useUserStore()
// 使用useRouter來操作路由
const router = useRouter()

// 定義下拉菜單選項，這裡只有一個“退出登录”的選項
const options = [
  {
    label: '退出登录', // 顯示在下拉菜單中的文字
    key: 'logout', // 這個選項的唯一標識，用於辨別用戶的選擇
  },
]

// 處理下拉菜單選項被選中的事件
function handleSelect(key) {
  if (key === 'logout') {
    userStore.logout() // 調用Vuex中的logout方法來處理用戶登出
    $message.success('已退出登录') // 顯示登出成功的消息
    router.push({ path: '/login' }) // 將頁面重定向到登錄頁面
  }
}
</script>

<template>
  <!-- NDropdown組件用於顯示下拉菜單，:options綁定下拉菜單的選項，@select綁定選擇事件的處理函數 -->
  <n-dropdown :options="options" @select="handleSelect">
    <!-- 下拉菜單的觸發元素，這裡是一個包含用戶頭像和名字的區塊 -->
    <div class="avatar">
      <img :src="userStore.avatar" />
      <!-- 顯示用戶頭像 -->
      <span>{{ userStore.name }}</span>
      <!-- 顯示用戶名 -->
    </div>
  </n-dropdown>
</template>

<style lang="scss" scoped>
/* 定義avatar類的樣式，用於顯示用戶頭像和名字 */
.avatar {
  display: flex; /* 使用flex布局 */
  align-items: center; /* 項目垂直居中 */
  cursor: pointer; /* 鼠標懸停時顯示指針形狀 */
  img {
    width: 100%;
    width: 25px; /* 頭像寬度 */
    height: 25px; /* 頭像高度 */
    border-radius: 50%; /* 圓形頭像 */
    margin-right: 10px; /* 頭像和名字之間的間距 */
  }
}
</style>
