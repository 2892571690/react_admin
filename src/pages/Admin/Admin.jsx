import React, { Component } from "react";
import store from "../../redux/store";
import { Redirect } from "react-router";
import { Layout } from "antd";
import NavLeft from '../../components/nav-left/NavLeft'
import Header from '../../components/header/Header'

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
          <Content>Content</Content>
          <Footer style={{background:'#ccc',textAlign:'center'}}>推荐使用谷歌浏览器，可以获得更佳的页面操作体验!</Footer>
        </Layout>
      </Layout>
    );
  }
}
