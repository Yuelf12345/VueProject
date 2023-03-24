import request from '@/utils/request'

export function getUserList(search){
    return request({
        url: '/api/user_list',
        method: 'get',
        params: { search }
    })
}

export function getPageList(currentPage, pageSize){
  return request({
    url:`/api/getPageList/${currentPage}/${pageSize}`,
    method: 'get',
  })
}

// 删除一个
export function removeUser(id) {
    return request({
      url: `/api/removeUser/${id}`,
      method: 'delete'
    })
  }
// 删除多个
  export function removeUserAll(ids) {
    return request({
      url: '/api/removeUser',
      method: 'delete',
      data: ids
    })
  }