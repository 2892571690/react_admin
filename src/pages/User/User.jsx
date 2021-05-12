import React, { Component } from 'react';
import { Card, Button, Table, Modal } from 'antd';
import { formateDate } from '../../utils/dataUtils';

import { reqUserList } from '../../api/api';

export default class User extends Component {
	state = {
		users: [], //所有用户列表
		roles: [], //使用角色的列表
		isShow: false //是否显示确认框
	};

	UNSAFE_componentWillMount() {
		this.initColumns();
	}

	componentDidMount() {
		this.getDate();
	}
	render() {
		let title = (
			<Button
				type="primary"
				onClick={() => {
					this.setState({ isShow: true });
				}}
			>
				创建用户
			</Button>
		);
		const { users, isShow } = this.state;
		return (
			<Card title={title}>
				<Table
					rowKey="_id"
					bordered
					dataSource={users}
					columns={this.columns}
					pagination={{
						defaultPageSize: 10,
						showQuickJumper: true,
						hideOnSinglePage: true,
						responsive: true,
						showSizeChanger: false
					}}
				/>
				<Modal
					title="添加用户"
					visible={isShow}
					onOk={this.addOrUpdateUser}
					destroyOnClose={true}
					onCancel={() => {
						// this.form.current.resetFields()
						this.setState({ isShow: false });
					}}
				>
					<div>11111</div>
				</Modal>
			</Card>
		);
	}

	// 创建用户
	addOrUpdateUser = () => {
		this.setState({ isShow: false });
	};

	// 获取数据
	getDate = async () => {
		const res = await reqUserList({});
		const { roles, users } = res;
		this.initRoleNames(roles);
		this.setState({
			users: users,
			roles: roles
		});
	};

	// 根据role的数组，生成包含所有角色名的对象(属性名用角色id值)
	initRoleNames = (roles) => {
		const roleNames = roles.reduce((pre, role) => {
			pre[role._id] = role.name;
			return pre;
		}, {});
		// 保存
		this.roleNames = roleNames;
	};

	// 初始化columns
	initColumns = () => {
		this.columns = [
			{
				title: '用户名',
				dataIndex: 'username'
			},
			{
				title: '邮箱',
				dataIndex: 'email'
			},
			{
				title: '电话',
				dataIndex: 'phone'
			},
			{
				title: '注册时间',
				dataIndex: 'create_time',
				render: formateDate
			},
			{
				title: '所属角色',
				dataIndex: 'role_id',
				render: (role_id) => this.roleNames[role_id]
			},
			{
				title: '操作',
				render: (user) => (
					<span>
						<Button
							type="primary"
							style={{ width: 40, height: 30, fontSize: 12, padding: 0, margin: '0 10px 0 0' }}
						>
							详情
						</Button>
						<Button type="primary" style={{ width: 40, height: 30, fontSize: 12, padding: 0 }}>
							修改
						</Button>
					</span>
				)
			}
		];
	};
}
