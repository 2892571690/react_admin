import React, { Component } from 'react';
import { Card, Select, Button, Input, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqProductList, reqSearchProduct } from '../../../api/api';

import '../less/Home.less';

const { Option } = Select;

export default class Home extends Component {
	state = {
		dataSource: [], //表单数据
		total: 0, //总数量,
		searchType: 'productName', //按照上面来搜索
		searchValue: '', //搜索的内容
		loading: false
	};

	UNSAFE_componentWillMount() {
		this.initColumns();
	}

	componentDidMount() {
		this.getProductList(1);
	}

	render() {
		const { dataSource, total, searchValue, loading } = this.state;

		const title = (
			<span>
				<Select
					defaultValue="productName"
					style={{ width: 120 }}
					onChange={(value) => {
						this.setState({ searchType: value });
					}}
				>
					<Option value="productName">按名称搜索</Option>
					<Option value="productDesc">按描述搜索</Option>
				</Select>
				<Input
					placeholder="关键字"
					style={{ width: 150, margin: '0 15px' }}
					value={searchValue}
					onChange={(e) => {
						this.setState({ searchValue: e.target.value });
					}}
				/>
				<Button
					type="primary"
					onClick={() => {
						this.getProductList(1);
					}}
				>
					搜索
				</Button>
			</span>
		);

		const extra = (
			<Button type="primary" icon={<PlusOutlined />}>
				添加商品
			</Button>
		);

		return (
			<Card title={title} extra={extra} style={{ width: '100%', height: '100%' }}>
				<Table
					bordered
					rowKey="_id"
					loading={loading}
					dataSource={dataSource}
					columns={this.columns}
					pagination={{
						total,
						defaultPageSize: 10,
						showQuickJumper: true,
						hideOnSinglePage: true,
						showSizeChanger: false,
						onChange: (pageNum) => this.getProductList(pageNum)
					}}
				/>
			</Card>
		);
	}

	//获取列表数据
	getProductList = async (pageNum) => {
		const { searchType, searchValue } = this.state;
		this.setState({ loading: true });
		let res;
		if (searchValue) {
			res = await reqSearchProduct({ [searchType]: searchValue, pageSize: 10, pageNum });
		} else {
			res = await reqProductList({ pageSize: 10, pageNum });
		}
		this.setState({
			loading: false,
			total: res.total,
			dataSource: res.list
		});
	};

	// 初始化Columns数据
	initColumns = () => {
		this.columns = [
			{
				title: '商品名称',
				width: 150,
				dataIndex: 'name'
			},
			{
				title: '商品描述',
				dataIndex: 'desc',
				ellipsis: true
			},
			{
				title: '价格',
				width: 150,
				dataIndex: 'price',
				render: (price) => '￥' + price //当前指定了对应的属性，传入的是对应的属性值
			},
			{
				title: '状态',
				width: 100,
				dataIndex: 'status',
				render: (status) => {
					return (
						<span style={{ display: 'flex' }}>
							<Button
								type="primary"
								style={{ width: 40, height: 30, fontSize: 12, padding: 0, margin: '0 10px 0 0' }}
							>
								下架
							</Button>
							<Tag
								color="green"
								style={{
									margin: 0,
									width: 40,
									height: 30,
									lineHeight: '28px',
									padding: 0,
									textAlign: 'center'
								}}
							>
								在售
							</Tag>
						</span>
					);
				}
			},
			{
				title: '操作',
				width: 100,
				render: (product) => {
					return (
						<span style={{ display: 'flex' }}>
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
					);
				}
			}
		];
	};
}
