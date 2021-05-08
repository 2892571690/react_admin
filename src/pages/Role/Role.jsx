import React, { Component } from 'react';

import { Card, Button, Table, Modal, message } from 'antd';
import AddForm from './component/add_form';

import { reqRoles, reqAddRoles } from '../../api/api';

import './Role.less';

// 角色路由
export default class Role extends Component {
	state = {
		roles: [], //所有角色列表
		role: {}, //选中的role
		isShowAdd: false //是否显示添加界面
	};
	UNSAFE_componentWillMount() {
		this.initColumns();
	}
	componentDidMount() {
		this.getData();
	}
	render() {
		const { roles, role, isShowAdd } = this.state;
		const title = (
			<span>
				<Button
					type="primary"
					onClick={() => {
						this.setState({ isShowAdd: true });
					}}
				>
					创建角色
				</Button>&nbsp;&nbsp;&nbsp;
				<Button type="primary" disabled={!role._id}>
					设置角色权限
				</Button>
			</span>
		);
		return (
			<Card title={title}>
				<Table
					rowKey="_id"
					bordered
					dataSource={roles}
					columns={this.columns}
					pagination={{ defaultPageSize: 10 }}
					rowSelection={{ type: 'radio', selectedRowKeys: [ role._id ] }}
					onRow={this.onRow}
				/>

				<Modal
					title="修改"
					visible={isShowAdd}
					onOk={this.addRole}
					destroyOnClose={true}
					onCancel={() => {
						// this.form.current.resetFields()
						this.setState({ isShowAdd: false });
					}}
				>
					<AddForm
						setFrom={(form) => {
							this.form = form;
						}}
					/>
				</Modal>
			</Card>
		);
	}
	// 初始化columns
	initColumns = () => {
		this.columns = [
			{
				title: '角色名称',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				key: 'create_time'
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
				key: 'auth_time'
			},
			{
				title: '授权人',
				dataIndex: 'auth_name',
				key: 'auth_name'
			}
		];
	};
	// 表格点击行
	onRow = (role) => {
		return {
			onClick: (event) => {
				//点击行
				console.log(role);
				this.setState({ role });
			}
		};
	};
	// 获取列表数据
	getData = async () => {
		const res = await reqRoles();
		console.log(res);
		this.setState({
			roles: res
		});
	};
	// 添加角色
	addRole = () => {
		this.form.current
			.validateFields()
			.then(async (res) => {
				const data = await reqAddRoles({ roleName: res.addRoleInput });
				const roles = [...this.state.roles];
				roles.push(data);
				message.success('添加成功');
				this.setState({
					roles,
					isShowAdd: false
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
