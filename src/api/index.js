import request from '@/api/request'; // 引入封装好的axios

// 登录
export function login (data) {
    return request({
        url: 'login',
        method: 'post',
        data: data
    })
}

// 产品列表
export function productsList () {
    return request({
        url: '/products/list',
        method: 'get'
    })
}