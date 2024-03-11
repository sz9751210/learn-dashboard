<template>
  <n-space vertical :size="12">
    <n-button @click="showAddBlogDialog">新增 Blog</n-button>
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
import { NButton, NDataTable, NSelect, NCard, NForm, NFormItem, NInput, NTag, useDialog, useMessage } from 'naive-ui'

const categories = ref([])
const { proxy } = getCurrentInstance()
const dialog = useDialog()
const message = useMessage()
const blogForm = ref({
  title: '',
  blogName: '',
  tags: '',
  url: '',
})

const loadData = async () => {
  try {
    const response = await proxy.$api.devopsApi.getBlogs()
    categories.value = response.blogData
    console.log(categories.value)
  } catch (error) {
    console.error('Error fetching containers:', error)
  }
}

// 顯示新增 Blog 的 Dialog
const showAddBlogDialog = () => {
  dialog.create({
    title: '新增 Blog',
    content: () => {
      return h(NForm, [
        h(NFormItem, { label: 'Title' }, () =>
          h(NInput, {
            value: blogForm.value.title,
            'onUpdate:value': (val) => (blogForm.value.title = val),
          })
        ),
        h(NFormItem, { label: 'Blog Name' }, () =>
          h(NInput, {
            value: blogForm.value.blogName,
            'onUpdate:value': (val) => (blogForm.value.blogName = val),
          })
        ),
        h(NFormItem, { label: 'Tags' }, () =>
          h(NInput, {
            value: blogForm.value.tags,
            'onUpdate:value': (val) => (blogForm.value.tags = val),
          })
        ),
        h(NFormItem, { label: 'URL' }, () =>
          h(NInput, {
            value: blogForm.value.url,
            'onUpdate:value': (val) => (blogForm.value.url = val),
          })
        ),
      ])
    },
    positiveText: '提交',
    negativeText: '取消',
    onPositiveClick: () => {
      addBlog()
    },
  })
}

// 將新 Blog 添加到對應的 category
const addBlog = () => {
  const newBlog = {
    blogName: blogForm.value.blogName,
    tags: blogForm.value.tags.split(',').map((tag) => tag.trim()),
    url: blogForm.value.url,
  }

  // 尋找是否已存在該 title 的 category
  const existingCategoryIndex = categories.value.findIndex((category) => category.title === blogForm.value.title)

  if (existingCategoryIndex !== -1) {
    // 如果找到，則將新 blog 添加到該 category 的 repoNames 中
    categories.value[existingCategoryIndex].repoNames.push(newBlog)
  } else {
    // 如果沒找到，則創建一個新的 category
    categories.value.push({
      title: blogForm.value.title,
      repoNames: [newBlog],
    })
  }

  message.success('Blog 添加成功')
  dialog.destroyAll() // 關閉對話框
  blogForm.value = { title: '', blogName: '', tags: '', url: '' } // 重置表單
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
