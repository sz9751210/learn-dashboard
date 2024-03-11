import Mock from 'mockjs'
import dockerApi from './mockData/docker'
import devopsApi from './mockData/devops'
Mock.mock(/docker\/containers/, 'get', dockerApi.getContainers)
Mock.mock(/docker\/images/, 'get', dockerApi.getImages)
Mock.mock(/api\/books/, 'get', devopsApi.getBooks)
Mock.mock(/api\/blogs/, 'get', devopsApi.getBlogs)
Mock.mock(/api\/roadmap/, 'get', devopsApi.getRoadmap)
