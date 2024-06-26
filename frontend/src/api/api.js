/**
 * 整個項目api的管理
 */

import request from './request'

const dockerApi = {
  getContainers(params) {
    return request({
      url: '/api/containers',
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
      mock: true,
    })
  },
  getBlogs(params) {
    return request({
      url: '/api/blogs',
      method: 'get',
      data: params,
      mock: true,
    })
  },
  addBlog: (blogData) => {
    return request({
      url: '/api/blogs',
      method: 'post',
      data: blogData,
      mock: true,
    })
  },
  getRoadmap(params) {
    return request({
      url: '/api/roadmap',
      method: 'get',
      data: params,
      mock: true,
    })
  },
  getSSLCertificate(params) {
    return request({
      url: '/api/ssls',
      method: 'get',
      data: params,
      mock: false,
    })
  },
}

export { dockerApi, devopsApi }
