import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.less";
import logo from "../../assets/images/logo.png";
import { reqLogin } from "../../api/api";
import store from "../../redux/store";
import { storeUser } from "../../redux/action/user_action";
import storageUtils from "../../utils/storageUtils";
export default class Login extends Component {
  // 点击登录按钮
  onFinish = (values) => {
    reqLogin({ ...values }).then((res) => {
      console.log(res);
      store.dispatch(storeUser(res));
      storageUtils.setStore("user", res);
      this.props.history.replace(`/`);
      message.success("登录成功");
    });
  };
  render() {
    // 判断有没有登录后的user，有就直接跳转到admin页面
    return (
      <div className="login">
        {/* 头部 */}
        <header className="login_header">
          <div className="header_logo">
            <img src={logo} alt="" />
          </div>
          <div className="header_text">泽辰系统管理后台</div>
        </header>
        {/* 主体表单 */}
        <section className="login_section">
          <div className="section_from">
            <div className="from_title">老板请登录</div>
            <div className="from_content">
              {/* 表单 */}
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="username"
                  className="username"
                  rules={[
                    {
                      // callback() 验证成功   //callback('xxx')验证失败
                      validator: (rule, value, callback) => {
                        if (!value) {
                          return Promise.reject("账号不能为空");
                          //或者 callback("账号不能为空")
                        } else if (value.length < 4) {
                          return Promise.reject("用户名至少4位");
                          //或者 callback("用户名至少4位")
                        } else if (value.length > 12) {
                          return Promise.reject("用户名最多12位");
                          //或者 callback("用户名最多12位")
                        } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
                          return Promise.reject(
                            "用户名必须是英文,数字以及下划线组成"
                          );
                          //或者 callback("用户名必须是英文,数字以及下划线组成")
                        } else {
                          return Promise.resolve();
                          // 或者callback()
                        }
                      },
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="请输入账号"
                    className="username_input"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  className="password"
                  rules={[
                    {
                      validator: (r, value, c) => {
                        if (!value) {
                          return Promise.reject("密码不能为空");
                        } else if (value.length < 4) {
                          return Promise.reject("密码名至少4位");
                        } else if (value.length > 12) {
                          return Promise.reject("密码名最多12位");
                        } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
                          return Promise.reject(
                            "密码名必须是英文,数字以及下划线组成"
                          );
                        } else {
                          return Promise.resolve();
                        }
                      },
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    className="password_input"
                    placeholder="请输入密码"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
