import request from '@/utils/request'
const api_name = '/admin/acl/user'

export function getUserList(search){
    return request({
        url: '/api/user_list',
        method: 'get',
        params: { search }
    })
}


// 删除一个
export function removeUser(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  }
// 删除多个
  export function removeUserAll(ids) {
    return request({
      url: `${api_name}/batchRemove`,
      method: 'delete',
      data: ids
    })
  }