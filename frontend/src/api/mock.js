import Mock from 'mockjs'
import dockerApi from './mockData/docker'
import devopsApi from './mockData/devops'
Mock.mock(/api\/containers/, 'get', dockerApi.getContainers)
Mock.mock(/docker\/images/, 'get', dockerApi.getImages)
// bevops api
Mock.mock(/api\/books/, 'get', devopsApi.getBooks)

// blog api
Mock.mock(/api\/blogs/, 'get', devopsApi.getBlogs)
Mock.mock(/api\/blogs/, 'post', devopsApi.addBlog)
Mock.mock(/api\/roadmap/, 'get', devopsApi.getRoadmap)
