
// 获取频道列表
import request from '@/utils/request'

export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 获取文章列表
export const getArticleLists = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
