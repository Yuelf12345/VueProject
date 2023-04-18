import request from '@/utils/request'

export function getUserList(search){
    return request({
        url: '/api/user_list',
        method: 'get',
        params: { search }
    })
}

export function getPageList(currentPage, queryParams){
  return request({
    url:'/api/user_getPageList',
    method: 'get',
    params: {currentPage, queryParams}
  })
}
// 获取user信息
export function getUser(getUser){
  return request({
    url:`/api/getUser/${getUser}`,
    method:'get'
  })
}

// 更新状态
export function changeUserStatus(data){
  return request({
    url:'/api/changeUserStatus',
    method:'put',
    data
  })
}

// 更新角色
export function upDateUser(data){
  return request({
    url:'/api/upDateUser',
    method:'put',
    data
  })
}

// 删除一个
export function removeUser(userId) {
  return request({
    url: `/api/removeUser/${userId}`,
    method: 'delete'
  })
}