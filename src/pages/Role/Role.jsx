import React, { Component } from 'react';

import { Card, Button, Table, Modal, message } from 'antd';
import AddForm from './component/add_form';
import AuthForm from './component/auth_form';

import { reqRoles, reqAddRoles, reqUpdateRoles } from '../../api/api';
import { formateDate } from '../../utils/dataUtils';
import storageUtils from '../../utils/storageUtils';

import './Role.less';

// 角色路由
export default class Role extends Component {
	authMenus = React.createRef();

	state = {
		roles: [], //所有角色列表
		role: {}, //选中的role
		isShowAdd: false, //是否显示添加界面
		isShowAuth: false //是否显示设置权限界面
	};

	UNSAFE_componentWillMount() {
		this.initColumns();
	}

	componentDidMount() {
		this.getData();
	}

	render() {
		const { roles, role, isShowAdd, isShowAuth } = this.state;
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
				<Button
					type="primary"
					disabled={!role._id}
					onClick={() => {
						this.setState({ isShowAuth: true });
					}}
				>
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
					title="添加角色"
					visible={isShowAdd}
					onOk={this.addRole}
					destroyOnClose={true}
					onCancel={() => {
						this.setState({ isShowAdd: false });
					}}
				>
					<AddForm
						setFrom={(form) => {
							this.form = form;
						}}
					/>
				</Modal>

				<Modal
					title="设置角色权限"
					visible={isShowAuth}
					onOk={this.setRoleAuth}
					destroyOnClose={true}
					onCancel={() => {
						this.setState({ isShowAuth: false });
					}}
				>
					<AuthForm ref={this.authMenus} role={role} />
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
				render: (create_time) => formateDate(create_time)
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
				render: (auth_time) => formateDate(auth_time)
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
				const roles = [ ...this.state.roles ];
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

	// 保存设置角色权限
	setRoleAuth = async () => {
		const role = this.state.role;
		const resMenus = this.authMenus.current.getMenus();
		role.menus = resMenus;
		role.auth_name = storageUtils.getStore('user').username;
		role.auth_time = Date.now();
		await reqUpdateRoles({ ...role });
		message.success('修改权限成功');
		this.setState({ isShowAuth: false });
	};
}
