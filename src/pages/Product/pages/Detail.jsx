import React, { Component } from 'react';
import { Card, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IMGURL } from '../../../redux/countant';
import { reqCategoryInfo } from '../../../api/api';
export default class Detail extends Component {
	state = {
		cName1: '',
		cName2: ''
	};

	async componentDidMount() {
		const { pCategoryId, categoryId } = this.props.location.state.product;
		const res = await Promise.all([ reqCategoryInfo({ categoryId: pCategoryId }), reqCategoryInfo({ categoryId }) ]);
		console.log(res)
		this.setState({
			cName1:res[0].name,
			cName2:res[1].name
		})
	}

	render() {
		const title = (
			<span style={{ display: 'flex', alignItems: 'center' }}>
				<ArrowLeftOutlined
					style={{ fontSize: '14px', fontWeight: 600 }}
					onClick={() => this.props.history.goBack()}
				/>
				<div style={{ margin: '0 0 0 10px', fontWeight: 600 }}>商品详情</div>
			</span>
		);

		const { Item } = List;
		const { name, desc, price, detail, imgs } = this.props.location.state.product;
		const { cName1, cName2 } = this.state;
		return (
			<Card title={title} style={{ height: '100%', overflow: 'auto' }} className="product_detail">
				<List>
					<Item>
						<span className="left">商品名称:</span>
						<span>{name}</span>
					</Item>
					<Item>
						<span className="left">商品描述:</span>
						<span>{desc}</span>
					</Item>
					<Item>
						<span className="left">商品价格:</span>
						<span>{price}元</span>
					</Item>
					<Item>
						<span className="left">所属分类:</span>
						<span>
							{cName1}
							{cName2 ? '--->' + cName2 : ''}
						</span>
					</Item>
					<Item>
						<span className="left">商品图片:</span>
						<span>
							{imgs.map((item) => {
								return <img key={item} className="product_detail_img" src={IMGURL + item} alt="logo" />;
							})}
						</span>
					</Item>
					<Item>
						<span className="left">商品详情:</span>
						<span dangerouslySetInnerHTML={{ __html: detail }} />
					</Item>
				</List>
			</Card>
		);
	}
}
