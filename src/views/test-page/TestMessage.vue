<template>
  <n-card v-for="(category, index) in categories" :key="`category-${index}`" :title="category.title" segmented>
    <n-data-table :columns="columns" :data="category.data" :pagination="category.pagination" />
  </n-card>
</template>

<script setup>
import { NCard, NDataTable } from 'naive-ui'
import { ref, onMounted, h } from 'vue'
const categories = ref([])

const fetchRepoInfo = async () => {
  const categoryData = [
    {
      title: 'Dev-Tools',
      repoNames: ['Ealenn/Echo-Server', 'cosmtrek/air', 'curlconverter/curlconverter'],
    },
    {
      title: 'Database',
      repoNames: ['Snapchat/KeyDB', 'Tencent/Tendis', 'etcd-io/bbolt'],
    },
    {
      title: 'CICD',
      repoNames: [
        'dromara/Jpom',
        'agola-io/agola',
        'argoproj/argo-cd',
        'concourse/concourse',
        'dagger/dagger',
        'gocd/gocd',
        'jenkinsci/jenkins',
      ],
    },
  ]

  for (const category of categoryData) {
    const requests = category.repoNames.map((name) =>
      fetch(`https://api.github.com/repos/${name}`).then((response) => response.json())
    )

    const repos = await Promise.all(requests)
    category.data = repos.map((repo) => ({
      key: repo.id,
      name: repo.full_name,
      license: repo.license?.spdx_id || 'N/A',
      stars: repo.stargazers_count,
      createdAt: formatDate(repo.created_at),
      updatedAt: formatDate(repo.updated_at),
      description: repo.description,
      url: repo.html_url,
    }))
    category.pagination = { pageSize: 5 }
  }

  categories.value = categoryData
}

onMounted(fetchRepoInfo)

const columns = [
  {
    title: 'Repository',
    key: 'name',
    render: (row) => {
      return h('a', { href: row.url, target: '_blank', class: 'repo-link' }, row.name)
    },
  },
  { title: 'License', key: 'license' },
  { title: 'Stars', key: 'stars' },
  { title: 'Created At', key: 'createdAt' },
  { title: 'Updated At', key: 'updatedAt' },
  { title: 'Description', key: 'description' },
]

function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  return `${year}/${month}/${day}`
}
</script>

<style>
.repo-link {
  color: #000; /* 默认颜色 */
  text-decoration: none; /* 去除下划线 */
}

.repo-link:hover {
  color: #42b983; /* 鼠标悬停颜色 */
}
</style>
