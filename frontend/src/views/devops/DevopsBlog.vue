<template>
  <n-space vertical :size="12">
    <n-button @click="showAddBlogDialog(false)">新增 Blog</n-button>
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
import {
  NButton,
  NDataTable,
  NSelect,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NTag,
  NSpace,
  useDialog,
  useMessage,
} from 'naive-ui'

const categories = ref([])
const { proxy } = getCurrentInstance()
const dialog = useDialog()
const message = useMessage()
const blogForm = ref({
  title: '',
  blogName: '',
  tags: '',
  url: '',
  isEdit: false,
  editIndex: null,
})

const loadData = async () => {
  try {
    const response = await proxy.$api.devopsApi.getBlogs()
    categories.value = response
    console.log(categories.value)
  } catch (error) {
    console.error('Error fetching containers:', error)
  }
}

// 顯示新增 Blog 的 Dialog
const showAddBlogDialog = (isEdit = false) => {
  if (!isEdit) {
    blogForm.value = {
      title: '',
      blogName: '',
      tags: '',
      url: '',
    }
  }
  dialog.create({
    title: isEdit ? '编辑 Blog' : '新增 Blog',
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
      if (blogForm.value.isEdit) {
        updateBlog() // 需要實現此方法
      } else {
        addBlog()
      }
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

  message.success('Blog 新增成功')
  dialog.destroyAll() // 關閉對話框
  blogForm.value = { title: '', blogName: '', tags: '', url: '' } // 重置表單
}

const updateBlog = () => {
  // 首先檢查是否處於編輯模式且editIndex是有效的
  if (!blogForm.value.isEdit || blogForm.value.editIndex === null) {
    message.error('無效的編輯操作')
    return
  }

  // 尋找舊的 categoryIndex
  const oldCategoryIndex = categories.value.findIndex((category) =>
    category.repoNames.some((repo, index) => {
      if (index === blogForm.value.editIndex) {
        // 保證當前的 editIndex 是屬於這個 category 的一部分
        return true
      }
      return false
    })
  )

  if (oldCategoryIndex === -1) {
    message.error('未找到原始分類，無法更新')
    return
  }

  const blogToUpdate = categories.value[oldCategoryIndex].repoNames[blogForm.value.editIndex]

  // 如果更新後的 title 與原始 title 不同，需要移動 blog 到新的 category
  if (blogToUpdate && blogForm.value.title !== categories.value[oldCategoryIndex].title) {
    // 從舊的 category 中移除
    categories.value[oldCategoryIndex].repoNames.splice(blogForm.value.editIndex, 1)

    // 尋找或創建新的 category
    const newCategoryIndex = categories.value.findIndex((category) => category.title === blogForm.value.title)
    if (newCategoryIndex !== -1) {
      // 如果新的 category 已存在，添加到該 category
      categories.value[newCategoryIndex].repoNames.push({
        blogName: blogForm.value.blogName,
        tags: blogForm.value.tags.split(',').map((tag) => tag.trim()),
        url: blogForm.value.url,
      })
    } else {
      // 如果新的 category 不存在，創建一個
      categories.value.push({
        title: blogForm.value.title,
        repoNames: [
          {
            blogName: blogForm.value.blogName,
            tags: blogForm.value.tags.split(',').map((tag) => tag.trim()),
            url: blogForm.value.url,
          },
        ],
      })
    }
  } else if (blogToUpdate) {
    // 如果在相同的 category，直接更新資料
    blogToUpdate.blogName = blogForm.value.blogName
    blogToUpdate.tags = blogForm.value.tags.split(',').map((tag) => tag.trim())
    blogToUpdate.url = blogForm.value.url
  } else {
    message.error('未找到指定的 Blog 進行更新')
    return
  }

  message.success('Blog 更新成功')
  dialog.destroyAll() // 關閉對話框
  resetBlogForm() // 重置表單
}

const resetBlogForm = () => {
  blogForm.value = { title: '', blogName: '', tags: '', url: '', isEdit: false, editIndex: null }
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
  {
    title: 'Action',
    key: 'action',
    render: (row) => {
      const categoryTitle = categories.value.find((category) => category.repoNames.includes(row)).title
      return h('div', [
        h(
          NButton,
          {
            style: { marginRight: '6px' },
            size: 'small',
            type: 'info',
            onClick: () => editBlog(row, categoryTitle),
          },
          'Edit'
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            onClick: () => deleteBlog(row, categoryTitle),
          },
          'Delete'
        ),
      ])
    },
  },
]

// const editBlog = (blog, title) => {
//   blogForm.value = {
//     ...blog,
//     title: title, // 使用所属分类的 title 更新表单
//     tags: blog.tags.join(', '), // 假设 tags 是一个数组
//     isEdit: true,
//     editIndex: categories.value.findIndex((category) => category.title === title), // 儲存正在編輯的 category 的索引
//   }
//   showAddBlogDialog(true) // 显示编辑对话框
// }

const editBlog = (blog, title) => {
  const categoryIndex = categories.value.findIndex((category) => category.title === title)
  if (categoryIndex === -1) {
    console.error('找不到指定的分類')
    return // 提前終止函數
  }
  const blogIndex = categories.value[categoryIndex].repoNames.findIndex((b) => b.blogName === blog.blogName)
  console.log(title)
  blogForm.value = {
    title: title, // 使用所属分类的 title 更新表单
    blogName: blog.blogName,
    tags: blog.tags.join(', '), // 假设 tags 是一个数组
    url: blog.url,
    isEdit: true,
    editIndex: blogIndex, // 儲存正在編輯的 Blog 在其分類中的索引
  }
  showAddBlogDialog(true) // 显示编辑对话框
}

const deleteBlog = (blog, categoryTitle) => {
  dialog.warning({
    title: '確認刪除',
    content: '你確定要刪除這筆Blog嗎？',
    positiveText: '確認刪除',
    negativeText: '取消',
    onPositiveClick: () => {
      const categoryIndex = categories.value.findIndex((category) => category.title === categoryTitle)
      if (categoryIndex !== -1) {
        const blogIndex = categories.value[categoryIndex].repoNames.findIndex((b) => b.blogName === blog.blogName)
        if (blogIndex !== -1) {
          categories.value[categoryIndex].repoNames.splice(blogIndex, 1)
          message.success('Blog已成功删除')
        }
      }
    },
  })
}

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
