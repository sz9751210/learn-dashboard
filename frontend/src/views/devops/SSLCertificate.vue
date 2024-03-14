<template>
  <n-data-table :columns="columns" :data="sslInfo" />
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { NDataTable } from 'naive-ui'

const { proxy } = getCurrentInstance()
// 假設這是從後端獲取的數據
const sslInfo = ref([])

// 設定 Data Table 的列
const columns = ref([
  { title: '域名', key: 'domain' },
  { title: '到期時間', key: 'expiry' },
  { title: '發行者', key: 'issuer' },
  { title: '主題', key: 'subject' },
  { title: '序列號', key: 'serial_number' },
  { title: '簽名算法', key: 'signature_algorithm' },
])

const loadSSLCertificate = async () => {
  try {
    const response = await proxy.$api.devopsApi.getSSLCertificate()
    sslInfo.value = response
  } catch (err) {
    console.error(err)
  }
}

// 將單個數據封裝成數組，因為 NDataTable 需要的 data 是一個數組
onMounted(loadSSLCertificate)
</script>
