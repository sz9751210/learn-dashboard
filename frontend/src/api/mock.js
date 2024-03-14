import Mock from 'mockjs'
import dockerApi from './mockData/docker'
import devopsApi from './mockData/devops'
Mock.mock(/mock\/api\/containers/, 'get', dockerApi.getContainers)
Mock.mock(/mock\/docker\/images/, 'get', dockerApi.getImages)
// bevops api
Mock.mock(/mock\/api\/books/, 'get', devopsApi.getBooks)
Mock.mock(/mock\/api\/ssl/, 'get', devopsApi.getSSLCerificate)

// blog api
Mock.mock(/mock\/api\/blogs/, 'get', devopsApi.getBlogs)
Mock.mock(/mock\/api\/blogs/, 'post', devopsApi.addBlog)
Mock.mock(/mock\/api\/roadmap/, 'get', devopsApi.getRoadmap)
