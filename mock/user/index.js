import { resolveToken } from '../_utils'

const users = {
  admin: {
    id: 1,
    name: '大脸怪(admin)',
    avatar: 'https://gitee.com/zclzone/res/raw/master/qs-zone/blob/img/lADPDiQ3QDTwsz3NAarNAaw_428_426.jpg',
    email: 'Ronnie@123.com',
    role: ['admin'],
  },
  editor: {
    id: 2,
    name: '大脸怪(editor)',
    avatar: 'https://gitee.com/zclzone/res/raw/master/qs-zone/blob/img/lADPDiQ3QDTwsz3NAarNAaw_428_426.jpg',
    email: 'Ronnie@123.com',
    role: ['editor'],
  },
  guest: {
    id: 3,
    name: '访客(guest)',
    avatar: 'https://gitee.com/zclzone/res/raw/master/qs-zone/blob/img/lADPDiQ3QDTwsz3NAarNAaw_428_426.jpg',
    role: [],
  },
}
export default [
  {
    url: '/api-mock/user',
    method: 'get',
    response: ({ headers }) => {
      const token = resolveToken(headers?.authorization)
      return {
        code: 0,
        data: {
          ...(users[token] || users.guest),
        },
      }
    },
  },
]
