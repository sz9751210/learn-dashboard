<template>
  <div class="mt-12 flex">
    <n-card :title="title" segmented>
      <template #header-extra>
        <n-button text type="primary">更多</n-button>
      </template>
      <div class="flex flex-wrap justify-between">
        <a
          v-for="(item, index) in cardList"
          :key="index"
          :href="item.link"
          target="_blank"
          class="my-6 w-320 flex-shrink-0 cursor-pointer hover:card-shadow"
        >
          <n-card size="small" :title="item.title">
            <p class="op-60">{{ item.desc }}</p>
          </n-card>
        </a>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { NCard, NButton } from 'naive-ui'
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  cardList: Array,
})
</script>

<style>
/* 如果 hover:card-shadow 是自定义样式，请确保在这里定义 */
.hover\\:card-shadow:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
