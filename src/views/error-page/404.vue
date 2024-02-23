<template>
  <div class="not-found">
    <h1>404</h1>
    <p>抱歉，您訪問的頁面不存在。</p>
    <router-link to="/">返回首頁</router-link>
  </div>
</template>

<script setup>
// 使用<script setup>時，不需要export default來定義組件

import { defineComponent } from 'vue'

// 如果需要使用組件名，可以通過defineComponent的name選項指定（通常不需要）
defineComponent({
  name: 'NotFound',
})
</script>

<style>
.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>
