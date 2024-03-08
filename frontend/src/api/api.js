/**
 * 整個項目api的管理
 */

import request from './request'

export default {
  getContainers(params) {
    return request({
      url: '/docker/containers',
      method: 'get',
      data: params,
      mock: true,
    })
  },
}
