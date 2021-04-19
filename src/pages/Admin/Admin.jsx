import React, { Component } from "react";
import store from "../../redux/store";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import NavLeft from '../../components/nav-left/NavLeft'
import Header from '../../components/header/Header'
import Home from '../Home/Home'
import Category from '../Category/Category'
import Product from '../Product/Product'
import Role from '../Role/Role'
import User from '../User/User'
import Bar from '../Charts/Bar'
import Line from '../Charts/Line'
import Pie from '../Charts/Pie'
const {Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  render() {
    let { user } = store.getState(); //获取redux中的登录user数据
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{height:'100%'}}>
        <Sider>
            <NavLeft/>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{margin:'20px',background:'#fff'}}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/bar' component={Bar}/>
              <Route path='/line' component={Line}/>
              <Route path='/pie' component={Pie}/>
              <Redirect to='/home'/>
            </Switch>
          </Content>
          <Footer style={{background:'#ccc',textAlign:'center'}}>推荐使用谷歌浏览器，可以获得更佳的页面操作体验!</Footer>
        </Layout>
      </Layout>
    );
  }
}
