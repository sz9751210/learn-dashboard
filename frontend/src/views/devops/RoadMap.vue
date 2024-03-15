<template>
  <div v-for="(categoryItem, index) in roadmap" :key="index">
    <CategorySection :title="categoryItem.title" :cardList="categoryItem.cardList" />
  </div>
</template>

<script setup>
import { NCard, NButton } from 'naive-ui'
import { ref, getCurrentInstance, onMounted } from 'vue'
import CategorySection from '@/components/CategorySection.vue'

const roadmap = ref([])
const { proxy } = getCurrentInstance()

const loadData = async () => {
  try {
    const response = await proxy.$api.devopsApi.getRoadmap()
    roadmap.value = response
    console.log(roadmap.value)
  } catch (error) {
    console.error('Error fetching containers:', error)
  }
}

onMounted(loadData)
</script>
