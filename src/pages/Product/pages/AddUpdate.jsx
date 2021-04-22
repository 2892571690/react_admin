import React, { Component } from 'react'
import { Card, Button, Input, Form, Cascader, Upload } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
export default class AddUpdate extends Component {
    render() {

        const title = (
			<span style={{ display: 'flex', alignItems: 'center' }}>
				<ArrowLeftOutlined
					style={{ fontSize: '14px', fontWeight: 600 }}
					onClick={() => this.props.history.goBack()}
				/>
				<div style={{ margin: '0 0 0 10px', fontWeight: 600 }}>添加商品</div>
			</span>
		);

        return (
            <Card title={title} style={{height:'100%'}}></Card>
        )
    }
}
