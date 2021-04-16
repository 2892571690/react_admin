/**
 * request.js
 * 通过promise对axios做二次封装，针对用户端参数，做灵活配置
 */
import instance from './interceptor'
import {
    message
} from 'antd';
export default function request(url, params, method, headers) {
    console.log(url, params, method, headers)
    return new Promise((resolve, reject) => {
        let data = {}
        // get请求使用params字段
        if (method === 'GET') data = {
            params: params
        }
        // post请求使用data字段
        if (method === 'POST') data = {
            data: params
        }
        console.log('参数-----', data)
        instance({
            url,
            method,
            ...data,
            headers: {
                'isLoading': headers
            }
        }).then((res) => {
            console.log(res)
            // 此处作用很大，可以扩展很多功能。
            // 比如对接多个后台，数据结构不一致，可做接口适配器
            // 也可对返回日期/金额/数字等统一做集中处理
            if (res.status === 0) {
                resolve(res.data);
            } else {
                // 通过配置可关闭错误提示
                reject(res);
            }
        }).catch((error) => {
            message.warning('网络连接异常！')
        })
    })
}