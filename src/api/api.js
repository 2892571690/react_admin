/**
 * index.js
 * api地址管理
 * 第四位参数：当前的请求是否需要loading
 */
import request from './request';

// 登录
export const reqLogin = (data) => request('/login', data, 'POST', false);

// 获取品类管理数据 parentId
export const reqCateGoryList = (data) => request('/manage/category/list', data, 'GET', false);

// 添加品类管理数据 categoryName parentId
export const reqAddCateGory = (data) => request('/manage/category/add', data, 'POST', false);

// 更新品类管理数据 categoryId categoryName
export const reqUpdateCateGory = (data) => request('/manage/category/update', data, 'POST', false);

// 获取商品管理的数据列表 pageNum pageSize
export const reqProductList = (data) => request('/manage/product/list', data, 'GET', false);

// 搜索商品管理的数据 productName productDesc pageNum pageSize
export const reqSearchProduct = (data) => request('/manage/product/search', data, 'GET', false);

// 获取商品管理详情的分类 categoryId
export const reqCategoryInfo = (data) => request('/manage/category/info', data, 'GET', false);

// 更新商品管理的上下架状态 productId status
export const reqUpdateProductStatus = (data) => request('/manage/product/updateStatus', data, 'POST', false);

// 删除图片 name
export const reqDeleteImg = (data) => request('/manage/img/delete', data, 'POST', false);

// 添加商品 categoryId pCategoryId name price desc detail imgs
export const reqAddProducr = (data) => request('/manage/product/add', data, 'POST', false);

// 更新商品 _id categoryId pCategoryId name price desc detail imgs
export const reqUpdateProducr = (data) => request('/manage/product/update', data, 'POST', false);

// 获取角色管理列表
export const reqRoles = (data) => request('/manage/role/list', data, 'GET', false);

// 添加角色 roleName
export const reqAddRoles = (data) => request('/manage/role/add', data, 'POST', false);
