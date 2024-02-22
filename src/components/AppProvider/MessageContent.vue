<script setup>
// 從 'naive-ui' 導入 useMessage 函數用於顯示消息
import { useMessage } from 'naive-ui'

// 使用 useMessage 函數
const NMessage = useMessage()

// 初始化loading消息變量
let loadingMessage = null

// 定義Message類
class Message {
  /**
   * 規則：
   * * 同一Message實例只顯示一個loading message，如果需要顯示多個可以創建多個Message實例
   * * 新的message會替換正在顯示的loading message
   * * 默認已創建一個Message實例$message掛載到window，同時也將Message類掛載到了window
   */

  // 移除消息的函數，默認延遲2000毫秒後銷毀
  removeMessage(message, duration = 2000) {
    setTimeout(() => {
      if (message) {
        message.destroy()
        message = null
      }
    }, duration)
  }

  // 顯示消息的函數，根據消息類型來顯示不同的消息
  showMessage(type, content, option = {}) {
    if (this.loadingMessage && this.loadingMessage.type === 'loading') {
      // 如果存在則替換正在顯示的loading message
      this.loadingMessage.type = type
      this.loadingMessage.content = content

      if (type !== 'loading') {
        // 非loading message需設置自動清除
        this.removeMessage(this.loadingMessage, option.duration)
      }
    } else {
      // 不存在正在顯示的loading則新建一個message,如果新建的message是loading message則將message賦值存儲下來
      let message = NMessage[type](content, option)
      if (type === 'loading') {
        this.loadingMessage = message
      }
    }
  }

  // 提供專門顯示加載消息的函數
  loading(content) {
    this.showMessage('loading', content, { duration: 0 })
  }

  // 提供顯示成功消息的函數
  success(content, option = {}) {
    this.showMessage('success', content, option)
  }

  // 提供顯示錯誤消息的函數
  error(content, option = {}) {
    this.showMessage('error', content, option)
  }

  // 提供顯示資訊消息的函數
  info(content, option = {}) {
    this.showMessage('info', content, option)
  }

  // 提供顯示警告消息的函數
  warning(content, option = {}) {
    this.showMessage('warning', content, option)
  }
}

// 在window對象上掛載$message實例
window['$message'] = new Message()

// 設置$message屬性，使其不可配置和不可寫
Object.defineProperty(window, '$message', {
  configurable: false,
  writable: false,
})
</script>

<template></template>
