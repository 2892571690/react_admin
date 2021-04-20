import React, { Component } from "react";
import { Form, Input } from "antd";
export default class ModifyForm extends Component {
  formRef = React.createRef();
  render() {
    const { modifyValue } = this.props;
    return (
      <Form ref={this.formRef}>
        <Form.Item>
          <Input defaultValue={modifyValue} placeholder="Basic usage" />
        </Form.Item>
      </Form>
    );
  }
}
