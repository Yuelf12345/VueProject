import request from '@/utils/request'

export function getRoleList(search){
    return request({
        url: '/api/role_list',
        method: 'get',
        params: { search }
    })
}

export function getPageList(currentPage, pageSize){
  return request({
    url:`/api/role_getPageList/${currentPage}/${pageSize}`,
    method: 'get',
  })
}
// 获取role信息
export function getRole(getRole){
  return request({
    url:`/api/getRole/${getRole}`,
    method:'get'
  })
}

// 更新状态
export function changeRoleStatus(data){
  return request({
    url:'/api/changeRoleStatus',
    method:'put',
    data
  })
}

// 更新角色
export function upDateRole(data){
  return request({
    url:'/api/upDateRole',
    method:'put',
    data
  })
}

// 删除一个
export function removeRole(roleId) {
  return request({
    url: `/api/removeRole/${roleId}`,
    method: 'delete'
  })
}