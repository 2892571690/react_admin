import React, { Component } from "react";
import { Form, Input } from "antd";
export default class ModifyForm extends Component {
  formRef = React.createRef();
  componentDidMount() {
    this.props.resetModify(this.formRef.current.resetFields)
  }
  render() {
    const { modifyValue } = this.props;
    return (
      <Form initialValues={{ Modify: modifyValue }} ref={this.formRef}>
        <Form.Item name="Modify">
          <Input placeholder="Basic usage" />
        </Form.Item>
      </Form>
    );
  }
}
