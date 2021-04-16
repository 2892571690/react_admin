/**
 * index.js
 * api地址管理
 * 第四位参数：当前的请求是否需要loading
 */
import request from './request';

export const reqLogin = (data) => request('/login', data, 'POST', false)