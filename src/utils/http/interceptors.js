import { router } from '@/router'
import { getToken, removeToken } from '@/utils/token'
import { isWithoutToken } from './help'

export function setupInterceptor(service) {
  service.interceptors.request.use(
    async (config) => {
      // 防止缓存，给get请求加上时间戳
      if (config.method === 'get') {
        config.params = { ...config.params, t: new Date().getTime() }
      }

      // 处理不需要token的请求
      if (isWithoutToken(config)) {
        return config
      }

      const token = getToken()
      if (token) {
        /**
         * * jwt token
         * ! 认证方案: Bearer
         */
        config.headers.Authorization = 'Bearer ' + token

        return config
      }
      /**
       * * 未登录或者token过期的情况下
       * * 跳转登录页重新登录，携带当前路由及参数，登录成功会回到原来的页面
       */
      const { currentRoute } = router
      router.replace({
        path: '/login',
        query: { ...currentRoute.query, redirect: currentRoute.path },
      })
      return Promise.reject({ code: '-1', message: '未登录' })
    },
    (error) => Promise.reject(error)
  )

  service.interceptors.response.use(
    (response) => response?.data,
    (error) => {
      let { code, message } = error.response?.data
      return Promise.reject({ code, message })
    }
  )
}
