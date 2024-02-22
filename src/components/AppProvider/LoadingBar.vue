<script setup>
// 從 'naive-ui' 導入 useLoadingBar 函數，這是一個提供操作加載條的Hook
import { useLoadingBar } from 'naive-ui'

// 使用 useLoadingBar 函數並將返回的加載條控制方法掛載到 window 對象上，使其可以在全局範圍內被訪問和使用
window['$loadingBar'] = useLoadingBar()

// 使用 Object.defineProperty 方法設置 window 上的 $loadingBar 屬性，
// 將 configurable 和 writable 都設置為 false，
// 這意味著這個屬性之後不能被刪除或修改，進一步保證了加載條控制方法的唯一性和穩定性
Object.defineProperty(window, '$loadingBar', {
  configurable: false,
  writable: false,
})
</script>

<template></template>
