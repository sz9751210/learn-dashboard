<template>
  <div class="select-container">
    <n-select
      v-model:value="selectedAuthorTags"
      :options="authorOptions"
      placeholder="選擇作者"
      multiple
      style="margin-bottom: 20px; width: 100%"
      class="select-item"
    />
    <n-select
      v-model:value="selectedTags"
      :options="tagOptions"
      placeholder="選擇分類"
      multiple
      style="margin-bottom: 20px; width: 100%"
      class="select-item"
    />
  </div>
  <div class="cards-container">
    <n-popover v-for="(card, index) in filteredCards" :key="`popover-${index}`" trigger="hover" placement="top-start">
      <template #trigger>
        <n-card class="card-item" @click="navigateTo(card.url)">
          <template #cover>
            <img :src="card.coverUrl" />
          </template>
          <template #header>
            <!-- 包裹标题以应用样式 -->
            <div class="card-title">{{ card.title }}</div>
          </template>
          <div class="tags-container">
            <n-tag v-for="(author, index) in card.authors" :key="`author-${index}`" type="info">
              {{ author }}
            </n-tag>
          </div>
          <div class="tags-container">
            <n-tag v-for="(tag, index) in card.tag" :key="`tag-${index}`" type="success">
              {{ tag }}
            </n-tag>
          </div>
          <!-- {{ card.content }} -->
        </n-card>
      </template>
      {{ card.content }}
    </n-popover>
  </div>
</template>

<script setup>
import { NCard, NSelect, NTag, NPopover } from 'naive-ui'
import { ref, computed } from 'vue'
import { books } from '@/api/books'

const cards = ref(books)

const selectedAuthorTags = ref([])
const selectedTags = ref([])

// 提取所有唯一的标签来作为选择器的选项
const tagOptions = computed(() => {
  const allTags = new Set(cards.value.flatMap((card) => card.tag))
  return Array.from(allTags).map((tag) => ({ label: tag, value: tag }))
})

const authorOptions = computed(() => {
  const allAuthors = new Set(cards.value.flatMap((card) => card.authors))
  return Array.from(allAuthors).map((author) => ({ label: author, value: author }))
})

// Filter cards based on selected tags and author tags
const filteredCards = computed(() => {
  return cards.value.filter(
    (card) =>
      (selectedTags.value.length === 0 || card.tag.some((tag) => selectedTags.value.includes(tag))) &&
      (selectedAuthorTags.value.length === 0 ||
        card.authors.some((author) => selectedAuthorTags.value.includes(author)))
  )
})

// 点击卡片时执行的函数
const navigateTo = (url) => {
  window.location.href = url
}
</script>

<style scoped>
.select-container {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* 根据需要调整 */
  margin-bottom: 20px;
}
.select-item {
  width: calc(50% - 10px); /* 减去间隙的宽度 */
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: start; /* 这将在卡片之间提供一些空间，并且在行的末尾对齐卡片 */
  gap: 10px;
}
.card-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em; /* 根据实际情况调整 */
  max-height: 2.4em; /* 根据实际情况调整，这里是 line-height 的两倍 */
  word-break: break-word;
}

.card-item {
  margin-bottom: 20px; /* 每个卡片底部的间距 */
  max-width: calc(33.3333% - 110px); /* 根据需要调整这里的 10px 以控制卡片之间的空间 */
  cursor: pointer; /* 表示卡片可点击 */
  transition: box-shadow 0.3s ease; /* 平滑过渡效果 */
}

.card-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Hover 效果 */
}
/* .tags-container {
  margin: 10px 0;
} */

.tags-container .n-tag {
  padding: 0 4px; /* 减小内边距 */
  font-size: 12px; /* 减小字体大小 */
  margin-right: 5px;
  margin-top: 10px;
}
.n-popover {
  max-width: 40px; /* 强制设置最大宽度 */
  word-wrap: break-word; /* 允许在必要时断字 */
}
</style>
