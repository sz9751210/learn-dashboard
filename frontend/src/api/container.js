import { defAxios } from '@/utils/http'

export const fetchContainers = async () => {
  try {
    const resp = await defAxios.get('/api/containers')
    return resp.data
  } catch (err) {
    console.log('讀取 containers failed', err)
    throw err
  }
}

export const fetchImages = async () => {
  try {
    const resp = await defAxios.get('/api/images')
    return resp.data
  } catch (err) {
    console.log('讀取 images failed', err)
    throw err
  }
}
