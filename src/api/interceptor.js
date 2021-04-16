/**
 * 生成基础axios对象，并对请求和响应做处理
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { message, Spin } from 'antd';

// 创建一个独立的axios实例
const service = axios.create({ 
    // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
    baseURL: 'http://120.55.193.14:5000',
});

// 当前正在请求的数量
let requestCount = 0

// 显示loading
function showLoading () {
    if (requestCount === 0) {
        var dom = document.createElement('div')
        dom.setAttribute('id', 'loading')
        document.body.appendChild(dom)
        ReactDOM.render(<Spin tip="加载中..." size="large"/>, dom)
    }
    requestCount++
}

// 隐藏loading
function hideLoading () {
    requestCount--
    if (requestCount === 0) {
        document.body.removeChild(document.getElementById('loading'))
    }
}

// 请求拦截
service.interceptors.request.use(config => {
    console.log(config)
    // requestCount为0，才创建loading, 避免重复创建
    if (config.headers.isLoading !== false) {
        showLoading()
    }
    return config;
}, err => {
    // 判断当前请求是否设置了不显示Loading
    if (err.config.headers.isLoading !== false) {
        hideLoading()
    }
    return Promise.reject(err)
});

// 返回拦截
service.interceptors.response.use((response)=>{
    // 判断当前请求是否设置了不显示Loading
    if (response.config.headers.isLoading !== false) {
        hideLoading()
    }
    // 获取接口返回结果
    const res = response.data;
    // code为0，直接把结果返回回去，这样前端代码就不用在获取一次data.
    if(res.code === 0){
        return Promise.resolve(res)
    }else{
        // 错误显示可在service中控制，因为某些场景我们不想要展示错误
        return Promise.resolve(res)
    }
}, err => {
    if (err.config.headers.isLoading !== false) {
        hideLoading()
    }
    if (err.message === 'Network Error') {
        message.warning('网络连接异常！')
    }
    if (err.code === 'ECONNABORTED') {
        message.warning('请求超时，请重试')
    }
    return Promise.reject(err)
});


export default service;