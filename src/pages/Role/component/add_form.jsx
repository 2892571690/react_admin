import React, { Component } from 'react';

import { Form, Input } from 'antd';

export default class AddForm extends Component {
	formRef = React.createRef();

	componentDidMount() {
		this.props.setFrom(this.formRef);
	}

	render() {
		return (
			<Form ref={this.formRef}>
				<Form.Item
					name="addRoleInput"
					label="角色名称："
					rules={[
						{
							required: true,
							message: '角色名称不能为空!'
						}
					]}
				>
					<Input placeholder="请输入角色名称" />
				</Form.Item>
			</Form>
		);
	}
}
