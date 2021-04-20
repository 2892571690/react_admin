import React, { Component } from "react";
import { Select, Form, Input } from "antd";
export default class AddForm extends Component {
  render() {
    const { Option } = Select;
    return (
      <Form>
        <Form.Item>
          <Select defaultValue="lucy">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Input placeholder="Basic usage"/>
        </Form.Item>
      </Form>
    );
  }
}
