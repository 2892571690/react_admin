/**
 * index.js
 * api地址管理
 * 第四位参数：当前的请求是否需要loading
 */
import request from './request';

// 登录
export const reqLogin = (data) => request('/login', data, 'POST', false)

// 获取品类管理数据 parentId
export const reqCateGoryList = (data) => request('/manage/category/list', data, 'GET', false)
// 添加品类管理数据 categoryName parentId
export const reqAddCateGory = (data) => request('/manage/category/add', data, 'POST', false)
// 更新品类管理数据 categoryId categoryName
export const reqUpdateCateGory = (data) => request('/manage/category/update', data, 'POST', false)