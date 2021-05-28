import axios from 'axios';
import qs from 'qs';

// 创建axios实例
const service = axios.create({
    baseURL: 'http://127.0.0.1:8080/api/', // api的base_url
    // withCredentials: true, // 跨域请求时是否发送cookies
    timeout: 5000 // 请求超时设置
})

// 请求拦截器
service.interceptors.request.use(config => {
    // 请求前做点什么？
    if (!config.data) {
        config.data = {};
    }

    // console.log(config)
    // 设置公共参数
    console.log(qs.stringify(config.data));
    const requestHeader = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        // token: getToken() // 请求头统一添加token
    }
    config.headers = Object.assign(config.headers, requestHeader)


    return config;
}, error => {
    // 处理请求错误
    console.log(error); // 用于调试
    return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(response => {
    // let res = respone.data; // 如果返回的结果是data.data的，嫌麻烦可以用这个，return res
    return response;
}, error => {
    console.log('error：' + error); // 用于调试
    return Promise.reject(error);
})

export default service;