<template>
  <div>
    <n-space vertical>
      <n-card v-for="cluster in clusters" :key="cluster.id" :title="`Cluster ${cluster.name}`">
        <div>CPU: {{ cluster.cpu }}</div>
        <div>Memory: {{ cluster.memory }}</div>
      </n-card>
    </n-space>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NCard, NSpace } from 'naive-ui'

const clusters = ref([])

let res = [
  {
    id: 1, // 假设每个集群有一个唯一的ID
    cpu: '32 cores',
    memory: '64GB',
    name: 'MyCluster',
  },
]

// 直接在setup中设置clusters的值
clusters.value = res
</script>
