import { defAxios } from '@/utils/http'

export const fetchContainers = async () => {
  try {
    const resp = await defAxios.get('/api/getContainers')
    return resp.data
  } catch (err) {
    console.log('讀取 containers failed', err)
    throw err
  }
}
