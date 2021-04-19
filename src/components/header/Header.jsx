import React, { Component } from 'react'
import store from '../../redux/store'
import menuList from '../../config/menuList'
import {withRouter} from 'react-router-dom'
import {formateDate} from '../../utils/dataUtils'
import {reqWeater} from '../../api/jsonp'
import './Header.less'
class Header extends Component {
    state={
        currentTime:formateDate(Date.now()),//当前时间
        weather:'',//天气字体
    }
    // 开启定时器获取时间
    getTime=()=>{
        setInterval(()=>{
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    // 获取天气
    getWeather = async () => {
        const { weather } = await reqWeater('合肥')
        this.setState({weather})
    }
    // 获取title
    getTitle(){
        const path = this.props.location.pathname
        let title = null
        menuList.forEach(item=>{
            if(item.key === path){
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }
    componentDidMount(){
        this.getTime()
        this.getWeather()
        this.getTitle()
    }
    render() {
        const {currentTime,dayPicTureUrl,weather} = this.state
        const title = this.getTitle()
        return (
            <div className="Header_wrap">
                <div className='Header_top'>
                    <div className='user_name'>欢迎，{store.getState().user.username}</div>
                    <div className='out'>退出</div>
                </div>
                <div className='Header_bom'>
                    <div className='menu_wrap'>
                        <div className='menu_name'>{title}</div>
                        <div className='sign_bom'></div>
                    </div>
                    <div className='time_weather'>
                        <div className="time">{currentTime}</div>
                        <div className="weather">{weather}</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)