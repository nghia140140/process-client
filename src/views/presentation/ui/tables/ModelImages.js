import React from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import strings from './../../../../localization'
import { getArray } from '~/views/utilities/helpers/utilObject';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class ModelImages extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      visible: true,
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: getArray(this.props.images , undefined, []).map((item, index)=>({
        uid: index,
        name: this.props.title,
        status: 'done',
        url: item,
      }))
    }
  }


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render(){
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const {onChange, images} = this.props
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return <Modal
        title={this.props.title}
        visible={this.state.visible}
        okText={strings.update}
        cancelText={strings.close}
        maskClosable={false}
        onOk={()=>{
           this.setState({visible: false})
           let updateFiles = (this.state.fileList || []).filter(item=> item.status === 'done').map(item=> item.url)
           onChange && onChange(updateFiles)
        }}
        onCancel={()=>{
          this.setState({visible: false})
          onChange && onChange(images)
        }}
        >
        <div className="clearfix">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      </Modal>
  }
}