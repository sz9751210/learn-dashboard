// 从pinia库中导入defineStore函数，用于创建状态管理库
import { defineStore } from 'pinia'

// 使用defineStore定义一个名为'app'的状态管理库
export const useAppStore = defineStore('app', {
  // 定义状态管理库的状态（state）
  state() {
    // state函数返回一个对象，这个对象包含了这个状态库管理的所有状态
    return {
      // themeOverrides对象用于存储应用的主题颜色自定义配置
      themeOverrides: {
        // common对象内包含了多个主题相关的颜色配置
        common: {
          primaryColor: '#316c72', // 主要颜色
          primaryColorSuppl: '#316c72', // 主要颜色补充
          primaryColorHover: '#316c72', // 主要颜色悬停状态
          successColorHover: '#316c72', // 成功状态颜色悬停
          successColorSuppl: '#316c72', // 成功状态颜色补充
        },
      },
    }
  },
})
