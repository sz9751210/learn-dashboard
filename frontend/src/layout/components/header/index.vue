<script setup>
import BreadCrumb from './BreadCrumb.vue'
</script>

<template>
  <header class="header">
    <bread-crumb />
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 0 35px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
