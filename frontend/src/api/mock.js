import Mock from 'mockjs'
import dockerApi from './mockData/docker'
Mock.mock(/docker\/containers/, 'get', dockerApi.getContainers)
