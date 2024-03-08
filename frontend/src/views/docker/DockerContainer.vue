<template>
  <h1>容器列表</h1>
  <p>以下是當前的容器狀態：</p>
  <n-data-table :columns="columns" :data="data" />
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { NDataTable } from 'naive-ui'

const { proxy } = getCurrentInstance()

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
    // render(row) {
    //   return row.ports.join(', ')
    // },
  },
]

const data = ref([])

const loadData = async () => {
  try {
    const response = await proxy.$api.getContainers()
    data.value = response.containerData
  } catch (error) {
    // 考虑添加用户友好的错误处理
    console.error('Error fetching containers:', error)
  }
}

onMounted(loadData)
</script>

<style scoped>
/* 在这里添加样式 */
</style>
