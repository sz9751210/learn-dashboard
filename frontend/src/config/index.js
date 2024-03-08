/**
 * 環境配置文件
 */

const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: '/mock',
  },
  test: {
    baseApi: '/api',
    mockApi: 'http://localhost:5173/',
  },
  prod: {
    baseApi: '/api',
    mockApi: 'http://localhost:5173/',
  },
}
export default {
  env,
  mock: true,
  ...EnvConfig[env],
}
