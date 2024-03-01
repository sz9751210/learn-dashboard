import { defAxios } from '@/utils/http'

export function getUser(id) {
  if (id) {
    return defAxios({
      url: `/user/${id}`,
      method: 'get',
    })
  }
  return defAxios({
    url: '/user',
    method: 'get',
  })
}
