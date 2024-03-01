<script setup>
import { NMenu } from 'naive-ui'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
// 从路由配置文件中导入所有异步路由和基础路由
import { basicRoutes } from '@/router/routes'

const router = useRouter()

const { currentRoute } = router
const routes = basicRoutes
console.log('basic Routes', basicRoutes)

const menuOptions = computed(() => {
  return generateOptions(routes, '')
})

function resolvePath(...pathes) {
  return (
    '/' +
    pathes
      .filter((path) => !!path && path !== '/')
      .map((path) => path.replace(/(^\/)|(\/$)/g, ''))
      .join('/')
  )
}

function generateOptions(routes, basePath) {
  let options = []
  routes.forEach((route) => {
    if (route.name && !route.isHidden) {
      let curOption = {
        label: (route.meta && route.meta.title) || route.name,
        key: route.name,
        path: resolvePath(basePath, route.path),
      }
      if (route.children && route.children.length) {
        curOption.children = generateOptions(route.children, resolvePath(basePath, route.path))
      }
      if (curOption.children && curOption.children.length <= 1) {
        if (curOption.children.length === 1) {
          curOption = { ...curOption.children[0] }
        }
        delete curOption.children
      }
      options.push(curOption)
    }
  })
  return options
}

function handleMenuSelect(key, item) {
  router.push(item.path)
}
</script>

<template>
  <n-menu
    class="side-menu"
    :root-indent="20"
    :options="menuOptions"
    :value="(currentRoute.meta && currentRoute.meta.activeMenu) || currentRoute.name"
    @update:value="handleMenuSelect"
  />
</template>

<style lang="scss">
.n-menu {
  margin-top: 10px;
  padding-left: 10px;
  .n-menu-item {
    margin-top: 0;
    position: relative;
    &::before {
      left: 0;
      right: 0;
      border-radius: 0;
      background-color: unset !important;
    }

    &:hover,
    &.n-menu-item--selected {
      border-radius: 0 !important;

      &::before {
        border-right: 3px solid $primaryColor;
        background-color: #16243a;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba($primaryColor, 0.3) 100%);
      }
    }
  }

  .n-menu-item-content-header {
    font-size: 14px;
    font-weight: bold;
  }

  .n-submenu-children {
    .n-menu-item-content-header {
      font-size: 14px;
      font-weight: normal;
      position: relative;
      overflow: visible !important;
      &::before {
        content: '';
        position: absolute;
        left: -15px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        border: 1px solid #333;
      }
    }
  }
}
</style>
