import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { isNullOrEmpty, getArray, getString } from '~/views/utilities/helpers/utilObject';


const upload_width = '70px';
const UploadStyled = styled(Upload)`
  .ant-upload-select-picture-card {
    width: ${upload_width} !important;
    height: ${upload_width} !important;
  }
  .ant-upload-list-item-error{
    width: ${upload_width} !important;
    height: ${upload_width} !important;
  }
  .ant-upload-list-picture-card .ant-upload-list-picture-card-container {
    width: ${upload_width} !important;
    height: ${upload_width} !important;
    span .ant-upload-list-item {
      width: ${upload_width} !important;
      height: ${upload_width} !important;
    }
  }
`

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class ImagesUpload extends React.Component {
  
  constructor(props){
    super(props)
    const {} = this.props
    this.state = {
      pointerInDiv: false,
      isFocused: false,
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: getArray(this.props.images, undefined, []).map(item=>({
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      })),
    };
  }
  componentDidMount() {
    document.addEventListener('click', this.onClickDocument);
  }

  componentWillUnmount() {
      document.removeEventListener('click', this.onClickDocument);
  }

  onClickDocument=()=>{
    if(this.state.isFocused  === true && this.state.pointerInDiv === false){
      this.props.onBlur && this.props.onBlur()
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

  render() {
    const { previewVisible, previewImage, fileList, previewTitle, } = this.state;
    const {editable} = this.props
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div  className="clearfix" 
            onClick={()=> this.setState({isFocused: true})}
            onMouseEnter={()=>{ if(this.state.pointerInDiv === false){this.setState({pointerInDiv: true})}}}
            onMouseLeave={()=> { if(this.state.pointerInDiv === true){this.setState({pointerInDiv: false})}}}>
        <UploadStyled
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          disabled={!editable}
          showUploadList={{showDownloadIcon: false, showPreviewIcon: editable, showRemoveIcon: editable}}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          
        >
          {!editable ? null : uploadButton}
        </UploadStyled>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}