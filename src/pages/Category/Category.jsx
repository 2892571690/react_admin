import React, { Component } from "react";
import { Card, Button, Table, Space, Modal, message } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import {
  reqCateGoryList,
  reqAddCateGory,
  reqUpdateCateGory,
} from "../../api/api";
import MyButton from "../../components/myButton/MyButton";
import AddForm from "./component/add_form";
import ModifyForm from "./component/modify_form";
import "./Category.less";
export default class Category extends Component {
  state = {
    dataSource: [], //表格数据
    subCateGory: [], //子分类
    loading: false, //是否展示loading
    parentId: 0, //请求列表的id
    parentName: "", //显示的父类名称
    showStatus: 0, // 0都不显示，1显示修改，2显示添加
  };
  // 初始化columns
  initColumns = () => {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        width: 300,
        render: (item) => (
          <Space>
            <MyButton onClick={this.showModifyCategory(item)}>
              修改分类
            </MyButton>
            {this.state.parentId === 0 ? (
              <MyButton onClick={this.showSubCateGory(item)}>
                查看子分类
              </MyButton>
            ) : null}
          </Space>
        ),
      },
    ];
  };
  //   获取列表数据
  getCateGoryList = async () => {
    this.setState({ loading: true });
    const { parentId } = this.state;
    const dataSource = await reqCateGoryList({ parentId });
    this.setState({ loading: false });
    if (parentId === 0) {
      this.setState({ dataSource });
    } else {
      this.setState({ subCateGory: dataSource });
    }
  };
  //   点击查看子分类
  showSubCateGory = (item) => {
    return () => {
      this.setState({ parentId: item._id, parentName: item.name }, () => {
        this.getCateGoryList();
      });
    };
  };
  //   点击title一级返回一级导航
  showFirstCategorys = () => {
    this.setState({ parentId: 0, subCateGory: [], parentName: "" });
  };
  //   点击修改
  showModifyCategory = (item) => {
    return () => {
      console.log(item);
      this.modifyValue = item;
      this.setState({
        showStatus: 1,
      });
    };
  };
  //   点击添加
  addCategory = () => {
    this.setState({
      showStatus: 2,
    });
  };
  //   点击修改弹出框的确定
  modifyHandleOk = () => {
    console.log(this.form.current.getFieldValue());
    const { _id } = this.modifyValue;
    const name = this.form.current.getFieldValue("Modify");
    reqUpdateCateGory({ categoryId: _id, categoryName: name }).then((res) => {
      message.success("修改成功");
      this.getCateGoryList();
      this.setState({
        showStatus: 0,
      });
    });
  };
  //   点击添加弹出框的确定
  addHandleOk = () => {
    console.log(this.addForm.current.getFieldsValue());
    const {
      addFormInput,
      addFormSelect,
    } = this.addForm.current.getFieldsValue();
    reqAddCateGory({
      categoryName: addFormInput,
      parentId: addFormSelect,
    }).then((res) => {
      message.success("添加成功");
      this.getCateGoryList();
      this.setState({
        showStatus: 0,
      });
    });
  };
  //   为第一次render()准备数据
  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  //   发送异步请求
  componentDidMount() {
    this.getCateGoryList();
  }
  render() {
    const {
      dataSource,
      loading,
      subCateGory,
      parentName,
      parentId,
      showStatus,
    } = this.state;
    const title =
      parentId === 0 ? (
        "一级分类列表"
      ) : (
        <span>
          <MyButton onClick={this.showFirstCategorys}>一级分类列表</MyButton>
          <span>
            <ArrowRightOutlined
              style={{ fontSize: "12px", padding: "0 0 0 10px" }}
            />
            <span style={{ fontSize: "12px", padding: "0 0 0 10px" }}>
              {parentName}
            </span>
          </span>
        </span>
      );
    const extra = (
      <Button
        style={{ background: "#262626", color: "#fff" }}
        type="primary"
        icon={<PlusOutlined />}
        onClick={this.addCategory}
      >
        添加
      </Button>
    );
    return (
      <Card
        title={title}
        extra={extra}
        style={{ width: "100%", height: "100%" }}
        headStyle={{ fontSize: "12px" }}
      >
        <Table
          rowKey="_id"
          bordered
          dataSource={parentId === 0 ? dataSource : subCateGory}
          columns={this.columns}
          loading={loading}
          pagination={{
            defaultPageSize: 10,
            showQuickJumper: true,
            hideOnSinglePage: true,
            responsive: true,
            showSizeChanger: false,
          }}
        />
        <Modal
          title="修改"
          visible={showStatus === 1}
          onOk={this.modifyHandleOk}
          destroyOnClose={true}
          onCancel={() => {
            // this.form.current.resetFields()
            this.setState({ showStatus: 0 });
          }}
        >
          <ModifyForm
            modifyValue={this.modifyValue}
            resetModify={(form) => {
              this.form = form;
            }}
          />
        </Modal>

        <Modal
          title="添加"
          visible={showStatus === 2}
          onOk={this.addHandleOk}
          destroyOnClose={true}
          onCancel={() => {
            this.setState({ showStatus: 0 });
          }}
        >
          <AddForm
            dataSource={dataSource}
            parentId={parentId}
            resetAdd={(form) => {
              this.addForm = form;
            }}
          />
        </Modal>
      </Card>
    );
  }
}
