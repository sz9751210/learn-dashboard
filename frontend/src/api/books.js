import { defAxios } from '@/utils/http'

export const fetchBooks = async () => {
  try {
    const resp = await defAxios.get('/api/getBooks')
    return resp.data
  } catch (err) {
    console.log('讀取 books failed', err)
    throw err
  }
}
