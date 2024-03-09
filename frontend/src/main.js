import '@/styles/index.scss'
import 'uno.css'

import { createApp } from 'vue'
import App from './App.vue'

import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import './api/mock.js'
import * as api from './api/api.js'

async function bootstrap() {
  const app = createApp(App)
  app.config.globalProperties.$api = api
  setupStore(app)
  setupRouter(app)

  app.mount('#app', true)
}

bootstrap()
