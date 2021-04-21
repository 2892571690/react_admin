import React, { Component } from "react";
import { Form, Input } from "antd";
export default class ModifyForm extends Component {
  formRef = React.createRef();
  componentDidMount() {
    this.props.resetModify(this.formRef);
  }
  render() {
    const { modifyValue } = this.props;
    return (
      <Form initialValues={{ Modify: modifyValue.name }} ref={this.formRef}>
        <Form.Item
          name="Modify"
          rules={[
            {
              required: true,
              message: "分类名称不能为空!",
            },
          ]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
      </Form>
    );
  }
}
