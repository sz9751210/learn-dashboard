import { defAxios } from '@/utils/http'

export const refreshToken = () => {
  return defAxios({
    url: '/auth/refreshToken',
    method: 'post',
  })
}
