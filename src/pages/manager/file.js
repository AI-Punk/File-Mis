import React, {Component} from 'react'
import { Form, Input, Select, Button, Table, Upload, Icon } from 'antd'
const FormItem = Form.Item
const Dragger = Upload.Dragger
function columnWrapper (self) {
  return [
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'createDate',
      dataIndex: 'createDate',
      key: 'createDate'
    }
  ]
}
const draggerProps = {
  name: 'file',
  multiple: true
};
class FileInfo extends Component {
  constructor (props) {
    super(props)
    const {
      id = -1,
      authUserList = [],
      title = '',
      content = '',
      dataSource
    } = props
    let selectedRowKeys = authUserList.map(authUser => {
      return dataSource.findIndex(user => {
        return authUser.id === user.id
      })
    }).filter(item => {
      return item >= 0
    })
    this.state = {
      id,
      selectedRowKeys,
      title,
      content,
      file: null
    }
  }
  onChange = (info) => {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(`${info.file.name} file uploaded successfully.`);
      this.props.dispatch({
        type: 'getFileList'
      })
    } else if (status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }
  submitFile = () => {
    const {
      id,
      selectedRowKeys,
      title,
      content
    } = this.state
    const { dataSource } = this.props
    let authUserList = selectedRowKeys.map(item => {
      return {
        id: dataSource[item]
      }
    }).filter(item => {
      return typeof item.id !== 'undefined'
    })
    this.props.dispatch({
      type: 'manager/postFile',
      payload: {
        id,
        authUserList,
        title,
        content
      }
    })
  }
  getUploadData = () => {
    const {id, title, content} = this.state
    return {
      id,
      title,
      content
    }
  }
  changeTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  changeContent = (e) => {
    this.setState({
      content: e.target.value
    })
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render () {
    const { selectedRowKeys, title, content } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const {dataSource} = this.props
    return (
      <div>
        <Form>
          <FormItem label="title">
            <Input value={title} onChange={this.changeTitle} />
          </FormItem>
          <FormItem label="content">
            <Input value={content} onChange={this.changeContent} />
          </FormItem>
        </Form>
        <Dragger {...draggerProps} data={this.getUploadData}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
          </Dragger>
        <Table 
          scroll={{ y: 240 }} 
          rowSelection={rowSelection} 
          dataSource={dataSource} 
          columns={columnWrapper(this)}
          pagination={{ pageSize: 10 }} />
        <Button type="primary">Submit</Button>
      </div>
    )
  }
}

export default FileInfo
