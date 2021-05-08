import React, { Component } from 'react';

import { Form, Input, Tree } from 'antd';

import menuList from '../../../config/menuList';

export default class AuthForm extends Component {
	formRef = React.createRef();

	constructor(props) {
		super(props);
		// 根据传入角色的menus生成初始状态
		const { menus } = this.props.role;
		this.state = {
			checkedKeys: menus
		};
	}

	render() {
		const { role } = this.props;
		const { checkedKeys } = this.state;
		return (
			<Form ref={this.formRef} initialValues={{ authRoleInput: role.name }}>
				<Form.Item name="authRoleInput" label="角色名称：">
					<Input placeholder="请输入角色名称" disabled />
				</Form.Item>
				<div style={{ margin: '0 0 10px 0' }}>平台权限：</div>
				<Tree
					checkable
					defaultExpandAll
					checkedKeys={checkedKeys}
          selectable={false}
					onCheck={this.onCheck}
					treeData={menuList}
				/>
			</Form>
		);
	}

	// 选中某个node时的回调
	onCheck = (checkedKeys, info) => {
		this.setState({
			checkedKeys
		});
		console.log('onCheck', checkedKeys, info);
	};

  // 传递给父组件选中的menusList
  getMenus=()=>{
    return this.state.checkedKeys
  }
}
