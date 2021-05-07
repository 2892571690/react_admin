import React, { Component } from 'react';
import { Card, Button, Input, Form, Cascader, Upload, InputNumber, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqCateGoryList, reqAddProducr, reqUpdateProducr } from '../../../api/api';
import PicturesWall from './Pictures-wall';
import RichTextEditor from './RichTextEditor';

const { TextArea } = Input;
export default class AddUpdate extends Component {
	state = {
		options: [] //存放分类的数组
	};

	pw = React.createRef();
	editor = React.createRef();

	componentDidMount() {
		this.getCategory('0');
	}

	UNSAFE_componentWillMount() {
		// 取出携带的state
		console.log('点击修改传的值-----', this.props.location.state);
		const product = this.props.location.state;
		// 保存是否是更新的标识
		this.isUpdate = !!product;
		this.product = product || {};
	}

	render() {
		const { options } = this.state;
		const { isUpdate, product } = this;
		const { pCategoryId, categoryId, imgs, detail } = product;
		// 用来接收级联分类ID的数组
		const categoryIds = [];
		if (categoryId) {
			// 商品是一个一级分类的商品
			categoryIds.push(pCategoryId);
			categoryIds.push(categoryId);
		} else {
			// 商品是一个二级分类的商品
			categoryIds.push(pCategoryId);
		}
		const title = (
			<span style={{ display: 'flex', alignItems: 'center' }}>
				<ArrowLeftOutlined
					style={{ fontSize: '14px', fontWeight: 600 }}
					onClick={() => this.props.history.goBack()}
				/>
				<div style={{ margin: '0 0 0 10px', fontWeight: 600 }}>{isUpdate ? '修改商品' : '添加商品'}</div>
			</span>
		);
		// 指定Item布局配置对象
		const formItemLayout = {
			labelCol: { span: 2 },
			wrapperCol: { span: 6 }
		};

		return (
			<Card title={title} style={{ height: '100%' }}>
				<Form
					{...formItemLayout}
					initialValues={{
						shopName: product.name,
						shopDescribe: product.desc,
						shopPrice: product.price,
						shopClassification: categoryIds
					}}
					onFinish={this.onFinish}
				>
					<Form.Item
						name="shopName"
						label="商品名称："
						rules={[
							{
								required: true,
								message: '请输入商品名称'
							}
						]}
					>
						<Input placeholder="请输入商品名称" />
					</Form.Item>
					<Form.Item
						name="shopDescribe"
						label="商品描述："
						rules={[
							{
								required: true,
								message: '请输入商品描述'
							}
						]}
					>
						<TextArea placeholder="请输入商品描述" autoSize />
					</Form.Item>
					<Form.Item
						name="shopPrice"
						label="商品价格："
						rules={[
							{
								required: true,
								message: '请输入商品价格'
							},
							{
								// callback() 验证成功   //callback('xxx')验证失败
								validator: (rule, value, callback) => {
									return value * 1 < 0 ? Promise.reject('商品价格不能为负数') : Promise.resolve();
								}
							}
						]}
					>
						<Input type="number" placeholder="请输入商品价格" addonAfter="元" />
					</Form.Item>
					<Form.Item
						name="shopClassification"
						label="商品分类："
						rules={[
							{
								required: true,
								message: '请输入商品分类'
							}
						]}
					>
						<Cascader options={options} loadData={this.loadData} />
					</Form.Item>
					<Form.Item className="PicturesWall" label="商品图片：" labelCol={{ span: 2 }} wrapperCol={{ span: 10 }}>
						<PicturesWall ref={this.pw} imgs={imgs} />
					</Form.Item>
					<Form.Item
						label="商品详情："
						className="RichTextEditor"
						labelCol={{ span: 2 }}
						wrapperCol={{ span: 20 }}
					>
						<RichTextEditor ref={this.editor} detail={detail} />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							提交
						</Button>
					</Form.Item>
				</Form>
			</Card>
		);
	}

	// 提交表单
	onFinish = async (value) => {
		const { shopName, shopDescribe, shopPrice, shopClassification } = value;
		let pCategoryId, categoryId;
		if (shopClassification.length === 1) {
			pCategoryId = '0';
			categoryId = shopClassification[0];
		} else {
			pCategoryId = shopClassification[0];
			categoryId = shopClassification[1];
		}
		const imgs = this.pw.current.getImageList();
		const editor = this.editor.current.getDetail();
		const product = {
			name: shopName,
			desc: shopDescribe,
			price: shopPrice,
			imgs,
			detail: editor,
			pCategoryId,
			categoryId
		};
		if (this.isUpdate) {
			product._id = this.product._id;
		}
		if (product._id) {
			// 更新商品
			const res = await reqUpdateProducr({ ...product });
			message.success('修改成功！');
		} else {
			// 添加商品
			const res = await reqAddProducr({ ...product });
			message.success('添加成功！');
		}
		this.props.history.goBack();
	};

	// 级联选择
	loadData = async (selectedOptions) => {
		const { options } = this.state;
		const targetOption = selectedOptions[selectedOptions.length - 1];
		targetOption.loading = true;

		// 根据选中的分类，获取二级分类
		const subCategorys = await this.getCategory(targetOption.value);
		targetOption.loading = false;
		if (subCategorys && subCategorys.length > 0) {
			// 生成一个二级列表的options
			const childOptions = subCategorys.map((c) => ({
				value: c._id,
				label: c.name,
				isLeaf: true
			}));
			// 关联到当前option上
			targetOption.children = childOptions;
		} else {
			//当前选中的分类没有二级分类
			targetOption.isLeaf = true;
		}
		this.setState(options);
	};

	// 获取分类
	getCategory = async (parentId) => {
		const res = await reqCateGoryList({ parentId });
		console.log(res);
		if (parentId === '0') {
			this.initOptions(res);
		} else {
			return res;
		}
	};

	// 更新分类列表
	initOptions = async (category) => {
		let options = category.map((c) => ({
			value: c._id,
			label: c.name,
			isLeaf: false
		}));
		// 如果是一个二级分类商品的更新
		const { isUpdate, product } = this;
		const { pCategoryId, categoryId } = product;
		if (isUpdate && pCategoryId !== '0') {
			// 获取对应的二级分类列表
			const subCategorys = await this.getCategory(pCategoryId);
			// 生成二级下拉列表的options
			const childOption = subCategorys.map((c) => ({
				value: c._id,
				label: c.name,
				isLeaf: true
			}));
			// 找到当前商品对应的一级option对象
			const targetOption = options.find((option) => option.value === pCategoryId);
			// 关联对应的一级option上
			targetOption.children = childOption;
		}
		this.setState({
			options
		});
	};
}
