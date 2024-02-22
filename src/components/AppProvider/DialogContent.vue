<script setup>
// 從 '@/utils/is' 導入用於檢查 null 或 undefined 的工具函數
import { isNullOrUndef } from '@/utils/is'
// 從 'naive-ui' 導入 useDialog 函數，用於彈出對話框
import { useDialog } from 'naive-ui'

// 使用 useDialog 函數
const NDialog = useDialog()

// 定義 Dialog 類，封裝對話框的顯示邏輯
class Dialog {
  // 顯示成功類型的對話框
  success(title, option) {
    this.showDialog('success', { title, ...option })
  }

  // 顯示警告類型的對話框
  warning(title, option) {
    this.showDialog('warning', { title, ...option })
  }

  // 顯示錯誤類型的對話框
  error(title, option) {
    this.showDialog('error', { title, ...option })
  }

  // 通用的對話框顯示方法
  showDialog(type = 'success', option) {
    if (isNullOrUndef(option.title)) {
      // 如果沒有提供標題，則不顯示圖標
      option.showIcon = false
    }
    // 調用 NDialog 的方法來顯示對話框
    NDialog[type]({
      positiveText: 'OK', // 確認按鈕文字
      closable: false,    // 是否顯示關閉按鈕
      ...option,          // 合併其他選項
    })
  }

  // 顯示確認對話框
  confirm(option = {}) {
    this.showDialog(option.type || 'error', {
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: option.confirm, // 確認回調
      onNegativeClick: option.cancel,  // 取消回調
      onMaskClick: option.cancel,      // 點擊遮罩層回調
      ...option,                       // 合併其他選項
    })
  }
}

// 在window對象上掛載$dialog實例
window['$dialog'] = new Dialog()
// 使用Object.freeze凍結$dialog對象，防止修改
Object.freeze(window.$dialog)
// 使用Object.defineProperty設置$dialog屬性，確保其不可修改和不可配置
Object.defineProperty(window, '$dialog', {
  configurable: false,
  writable: false,
})
</script>

<template></template>
