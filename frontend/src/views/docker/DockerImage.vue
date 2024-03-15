<template>
  <n-data-table :columns="columns" :data="images" />
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { NDataTable } from 'naive-ui'

const { proxy } = getCurrentInstance()

const columns = [
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'Repository',
    key: 'repository',
  },
  {
    title: 'Tag',
    key: 'tag',
  },
  {
    title: 'Size',
    key: 'size',
  },
]

const images = ref([])

const loadImages = async () => {
  try {
    const response = await proxy.$api.dockerApi.getImages()
    images.value = response
  } catch (error) {
    console.error('Error fetching images:', error)
  }
}

onMounted(loadImages)
</script>
