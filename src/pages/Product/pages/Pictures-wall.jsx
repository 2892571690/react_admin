import React from 'react'
import { Upload, Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteImg} from '../../../api/api'
import {IMGURL} from '../../../redux/countant'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// 用于组件上传的组件
export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,//是否显示大图预览model
    previewImage: '',//大图的url
    previewTitle: '',
    fileList: [
    //   {
    //     uid: '-1',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    ],
  };

  constructor(props){
    super(props)
    let fileList = []
    const {imgs} = this.props
    console.log(imgs,'imgsimgsimgsimgs')
    if(imgs && imgs.length>0){
        fileList = imgs.map((img,index)=>({
            uid: -index,
            name: img,
            status: 'done',
            url:IMGURL + img ,
        }))
    }
    this.state={
        previewVisible: false,//是否显示大图预览model
        previewImage: '',//大图的url
        previewTitle: '',
        fileList//所有已上传图片的数组
    }
  }

  //   影藏model
  handleCancel = () => this.setState({ previewVisible: false });

  //   显示指定file对应的大图
  handlePreview = async file => {
      console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  // file：当前操作的图片文件（上传/删除）
  // fileList：所有已上传图片文件对象的数组
  handleChange = async ({ file,fileList }) => {

    // 一旦上传成功，将当前上传的file的信息修正（name，url）
    if(file.status === 'done'){
        console.log(file)
        const result = file.response
        if(result.status === 0){
            message.success('图片上传成功')
            const {url,name} = result.data
            file = fileList[fileList.length-1]
            file.name = name
            file.url = url
        }else{
            message.error('图片上传失败')
        }
    }else if(file.status === 'removed'){
        const res = await reqDeleteImg({name:file.name})
        console.log(res)
        message.success('图片删除成功')
    }
    this.setState({ fileList })
  }

  getImageList=()=>{
      return this.state.fileList.map(c=>c.name)
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload"//上传图片的接口
          name='image'//请求参数名
          accept='image/*'//指定的上传类型
          listType="picture-card"//卡片的样式
          fileList={fileList}//所有已上传图片文件对象的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}