<template>
  <n-space vertical :size="12">
    <!-- 為 n-select 添加一個外部容器 -->
    <div class="select-container">
      <n-select v-model:value="selectedTags" :options="tagOptions" multiple placeholder="Select tags" />
    </div>
    <n-card
      v-for="(category, index) in categories"
      :key="`category-${index}`"
      class="card-spacing"
      :title="category.title"
      segmented
    >
      <n-data-table
        :bordered="false"
        :columns="columns"
        :data="filteredData(category.repoNames)"
        :pagination="pagination"
      />
    </n-card>
  </n-space>
</template>

<script setup>
import { h, ref, computed, getCurrentInstance, onMounted } from 'vue'
import { NTag, NButton, NDataTable, NSelect, NCard } from 'naive-ui'

const categories = ref([])
const { proxy } = getCurrentInstance()

const loadData = async () => {
  try {
    const response = await proxy.$api.devopsApi.getBlogs()
    categories.value = response.blogData
    console.log(categories.value)
  } catch (error) {
    console.error('Error fetching containers:', error)
  }
}

onMounted(loadData)

const rawData = categories.value.flatMap((category) => category.repoNames)

const tagOptions = Array.from(new Set(rawData.flatMap((item) => item.tags))).map((tag) => ({
  label: tag,
  value: tag,
}))

const selectedTags = ref([])

const filteredData = (repoNames) => {
  if (selectedTags.value.length === 0) {
    return repoNames
  }
  return repoNames.filter((item) => selectedTags.value.some((tag) => item.tags.includes(tag)))
}

const openUrl = (url) => {
  window.open(url, '_blank').focus()
}

const columns = [
  {
    title: 'Blog Name',
    key: 'blogName',
  },
  {
    title: 'Tags',
    key: 'tags',
    render: (row) => {
      return row.tags.map((tag) =>
        h(
          NTag,
          {
            style: { marginRight: '6px' },
            type: 'info',
            bordered: false,
          },
          () => tag
        )
      )
    },
  },
  {
    title: 'URL',
    key: 'url',
    render: (row) => {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => openUrl(row.url),
        },
        () => 'Visit'
      )
    },
  },
]

const pagination = {
  pageSize: 10,
}
</script>
<style>
/* 添加自定義樣式 */
.select-container {
  margin-bottom: 10px; /* 設定距離為 10px */
}
.card-spacing:not(:first-child) {
  margin-top: 10px;
}
</style>
