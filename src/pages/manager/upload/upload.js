import React, {Component} from 'react'
import { Upload, Icon, message } from 'antd'
import Config from '../../../config'
const {getURL} = Config
const Dragger = Upload.Dragger
const draggerProps = {
  name: 'file',
  multiple: true,
  action: getURL('uploadFile'),
  withCredentials: true
};
class UploadPage extends Component {
  onChange = (info) => {
    const { status , response } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(`${info.file.name} file uploaded successfully.`);
      if (response.success) {
        this.props.updateFileList(info.fileList)
        this.props.dispatch({
          type: 'manager/getFileList'
        })
      } else {
        message.error('[Upload file fail]' + response.data)
      }
    } else if (status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }
  getUploadData = (file) => {
    // how to bring cookie ?
    const {uploadGroup} = this.props
    return {
      id: -1,
      title: file.name,
      content: file.name,
      type: file.name.split('.').slice(-1)[0] || 'null',
      group: uploadGroup
    }
  }
  render () {
    return (
      <Dragger {...draggerProps} onChange={this.onChange} data={this.getUploadData}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
      </Dragger>
    )
  }
}
export default UploadPage