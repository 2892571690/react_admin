import React, { Component } from "react";
import store from "../../redux/store";
import {storeUser} from '../../redux/action/user_action'
import menuList from "../../config/menuList";
import { withRouter } from "react-router-dom";
import { formateDate } from "../../utils/dataUtils";
import storageUtils from '../../utils/storageUtils'
import { Modal} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { reqWeater } from "../../api/jsonp";
import "./Header.less";
class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()), //当前时间
    weather: "", //天气字体
    time:null,//定时器
  };
  // 开启定时器获取时间
  getTime = () => {
    this.state.time = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
  };
  // 获取天气
  getWeather = async () => {
    const { weather } = await reqWeater("合肥");
    this.setState({ weather });
  };
  // 获取title
  getTitle() {
    // 得到当前请求路径
    const path = this.props.location.pathname;
    let title = null;
    menuList.forEach((item) => {
      if (item.key === path) {//如果当前item对象的key与path一样，item的title就是需要显示的title
        title = item.title;
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find((cItem) => path.indexOf(cItem.key) === 0);
        // 如果有值才说明有匹配
        if (cItem) {
          // 取出它的title
          title = cItem.title;
        }
      }
    });
    return title;
  }
  // 显示模态框
  showModal = () => {
    Modal.confirm({
      title: "你确定要退出？",
      icon: <ExclamationCircleOutlined />,
      onOk:()=>{
        storageUtils.cleStore('user')
        store.dispatch(storeUser({}))
        this.props.history.replace('/login')
      },
    });
  };
  componentDidMount() {
    this.getTime();
    this.getWeather();
    this.getTitle();
  }
  componentWillUnmount(){
      //   清除定时器
      clearInterval(this.state.time)
  }
  render() {
    const { currentTime, dayPicTureUrl, weather } = this.state;
    const title = this.getTitle();
    return (
      <div className="Header_wrap">
        <div className="Header_top">
          <div className="user_name">
            欢迎，{store.getState().user.username}
          </div>
          <div className="out" onClick={this.showModal}>
            退出
          </div>
        </div>
        <div className="Header_bom">
          <div className="menu_wrap">
            <div className="menu_name">{title}</div>
            <div className="sign_bom"></div>
          </div>
          <div className="time_weather">
            <div className="time">{currentTime}</div>
            <div className="weather">{weather}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
