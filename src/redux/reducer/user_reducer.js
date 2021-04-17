/*
    1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质是一个函数
    2.reducer函数会接到两个参数，分别为：之前的状态()，动作对象()
*/ 
import {USER} from '../countant';
// 初始值
const initState = null
export default function userReducer(preState=initState,action){
    // 从action对象中获取type，data
    const {type,data} = action
    // 根据type决定如何加工数据
    switch (type) {
        case USER:
            return data
        default:
            return preState
    }
}