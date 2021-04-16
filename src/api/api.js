/**
 * index.js
 * api地址管理
 */
import request from './request';

export const reqLogin = (data) => request('/login', data, 'POST')