/**
 * 整個項目api的管理
 */

import request from './request'

const dockerApi = {
  getContainers(params) {
    return request({
      url: '/docker/containers',
      method: 'get',
      data: params,
      mock: true,
    })
  },
  getImages(params) {
    return request({
      url: '/docker/images',
      method: 'get',
      data: params,
      mock: true,
    })
  },
}

const devopsApi = {
  getBooks(params) {
    return request({
      url: '/api/books',
      method: 'get',
      data: params,
    })
  },
  getBlogs(params) {
    return request({
      url: '/api/blogs',
      method: 'get',
      data: params,
    })
  },
  getRoadmap(params) {
    return request({
      url: '/api/roadmap',
      method: 'get',
      data: params,
    })
  },
}

export { dockerApi, devopsApi }
