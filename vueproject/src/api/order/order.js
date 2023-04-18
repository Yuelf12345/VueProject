import request from '@/utils/request'

export function getOrderList(currentPage, pageSize){
  return request({
    url:`/api/getOrderList/${currentPage}/${pageSize}`,
    method: 'get',
  })
}

//新增
export function addOrder(data){
  return request({
    url:'/api/addOrder',
    method: 'post',
    data,
  })
}
// 更新
export function upDataOrder(data){
  return request({
    url:'/api/upDataOrder',
    method:'put',
    data
  })
}
// 删除一个
export function removeOrder(id) {
    return request({
      url: `/api/removeOrder/${id}`,
      method: 'delete'
    })
  }
// 删除多个
  export function removeOrderAll(ids) {
    return request({
      url: '/api/removeOrderAll',
      method: 'delete',
      data: ids
    })
  }