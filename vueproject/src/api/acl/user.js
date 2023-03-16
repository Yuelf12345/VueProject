import request from '@/utils/request'

export function getUserList(search){
    return request({
        url: '/api/user_list',
        method: 'get',
        params: { search }
    })
}