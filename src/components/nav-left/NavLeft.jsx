import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import menuList from '../../config/menuList';
import './NavLeft.less';
import logo from '../../assets/images/logo.png';

const { SubMenu } = Menu;
class NavLeft extends Component {
	getMenuNodes = (menuList) => {
		let { pathname } = this.props.location;
		return menuList.map((item) => {
			const icon = React.createElement(Icon[item.icon]);
			if (!item.children) {
				return (
					<Menu.Item key={item.key} icon={icon}>
						<Link to={item.key}>{item.title}</Link>
					</Menu.Item>
				);
			} else {
				// 查找一个与当前请求路径匹配的字Item
				const cItem = item.children.find((cItem) => pathname.indexOf(cItem.key) === 0);
				// 如果存在，说明当前item的子列表需要打开
				if (cItem) {
					this.openKey = item.key;
				}
				return (
					<SubMenu key={item.key} icon={icon} title={item.title}>
						{this.getMenuNodes(item.children)}
					</SubMenu>
				);
			}
		});
	};

	UNSAFE_componentWillMount() {
		this.menuNodes = this.getMenuNodes(menuList);
	}

	render() {
		let { pathname } = this.props.location;
		if (pathname.indexOf('/product') === 0) {
			pathname = '/product';
		}
		return (
			<div className="NavLeft_wrap">
				<Link to="/" className="NavLeft_header">
					<div className="header_img">
						<img src={logo} alt="logo" />
					</div>
					<div className="header_title">泽辰管理后台</div>
				</Link>
				{/* 侧边栏 */}
				<Menu selectedKeys={[ pathname ]} defaultOpenKeys={[ this.openKey ]} mode="inline" theme="dark">
					{this.menuNodes}
				</Menu>
			</div>
		);
	}
}

export default withRouter(NavLeft);
