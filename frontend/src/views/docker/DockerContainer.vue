<template>
  <n-table :columns="columns" :data="data" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { NTable, NButton } from 'naive-ui'
import { fetchContainers } from '@/api/container'

const columns = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Image',
    key: 'image',
  },
  {
    title: 'Status',
    key: 'status',
  },
  {
    title: 'CPU (%)',
    key: 'cpu',
  },
  {
    title: 'Port(s)',
    key: 'ports',
  },
]

const data = ref([])

const loadData = async () => {
  try {
    data.value = await fetchContainers()
  } catch (error) {
    console.error('Error fetching containers:', error)
  }
}

console.log('container', data)
// 组件挂载时获取数据
onMounted(loadData)
</script>

<style scoped>
/* 在这里添加样式 */
</style>
