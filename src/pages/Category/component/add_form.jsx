import React, { Component } from "react";
import { Select, Form, Input } from "antd";
export default class AddForm extends Component {
  formRef = React.createRef();
  componentDidMount() {
    this.props.resetAdd(this.formRef);
  }
  render() {
    const { Option } = Select;
    const { dataSource, parentId } = this.props;
    return (
      <Form ref={this.formRef} initialValues={{addFormSelect:parentId}}>
        <div
          style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 5px 0" }}
        >
          所属分类:
        </div>
        <Form.Item name="addFormSelect">
          <Select>
            {dataSource.map((item) => {
              return (
                <Option value={item._id} key={item._id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "600",
            margin: "10px 0 5px 0",
          }}
        >
          分类名称:
        </div>
        <Form.Item name="addFormInput">
          <Input placeholder="请输入分类名称" />
        </Form.Item>
      </Form>
    );
  }
}
