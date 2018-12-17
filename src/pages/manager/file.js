import React, {Component} from 'react'
import { Form, Input, Row, Col, Slider, InputNumber, Button, Table, Upload, Icon, message } from 'antd'
import Config from '../../config'
const FormItem = Form.Item
const Dragger = Upload.Dragger
const {getURL} = Config
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
  multiple: true,
  action: getURL('uploadFile'),
  withCredentials: true
};
class FileInfo extends Component {
  constructor (props) {
    super(props)
    const {
      id = -1,
      authUserList = [],
      title = '',
      content = '',
      dataSource,
      type = 'null'
    } = props
    // let selectedRowKeys = authUserList.map(authUser => {
    //   return dataSource.findIndex(user => {
    //     return authUser.id === user.id
    //   })
    // }).filter(item => {
    //   return item >= 0
    // })
    let selectedRowKeys = authUserList.map(authUser => {
      return authUser.id
    }).filter(item => {
      return item >= 0
    })
    let mapAuthUserList = dataSource.map(record => {
      let limit = 1
      let findIndex = authUserList.findIndex(item => {return item.id === record.id})
      if (findIndex > -1) {
        limit = authUserList[findIndex].limit
      }
      return {
        id: record.id,
        limit
      }
    })
    this.state = {
      id,
      selectedRowKeys,
      authUserList: mapAuthUserList,
      title,
      content,
      file: null,
      type
    }
  }
  onChange = (info) => {
    const { status , response } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(`${info.file.name} file uploaded successfully.`);
      let type = info.file.name.split('.').slice(-1)[0] || 'null'
      if (response.success) {
        this.setState({
          id: response.data.id,
          type
        })
        this.props.dispatch({
          type: 'getFileList'
        })
      } else {
        message.error('[Upload file fail]' + response.data)
      }
    } else if (status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }
  submitFile = () => {
    const {
      id,
      selectedRowKeys,
      authUserList,
      title,
      content,
      type
    } = this.state
    // const { dataSource } = this.props
    // let selectedRowKeysToRecords = selectedRowKeys.map(item => {
    //   return {id: dataSource[item].id}
    // })
    let selectedRowKeysToRecords = selectedRowKeys.map(item => {
      return {id: item}
    })
    let mapAuthUserList = authUserList.filter(item => {
      return item.limit > 0
    }).filter(item => {
      return selectedRowKeysToRecords.findIndex(record => {
        return record.id === item.id
      }) > -1
    })
    this.props.dispatch({
      type: 'manager/postFile',
      payload: {
        id,
        authUserList: mapAuthUserList,
        title,
        content,
        type
      }
    })
  }
  getUploadData = () => {
    // how to bring cookie ?
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
  changeLimit = (index, value) => {
    const {authUserList} = this.state
    authUserList[index].limit = value
    this.setState({
      limit: authUserList
    })
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  expandedRowRender = (record, index) => {
    const {authUserList, selectedRowKeys} = this.state
    // let findIndex = authUserList.findIndex(item => {
    //   return item.id === record.id
    // })
    if (selectedRowKeys.indexOf(record.id) > -1) {
      let limit = authUserList[index].limit
      return (<Row>
        <Col span={12}>
          <Slider
            min={0}
            max={1}
            onChange={(value) => {this.changeLimit(index, value)}}
            value={typeof limit === 'number' ? limit : 0}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{ marginLeft: 16 }}
            step={0.01}
            value={limit}
            onChange={(value) => {this.changeLimit(index, value)}}
          />
        </Col>
      </Row>)
    } else {
      return (<p>choose this row first.</p>)
    }
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
          pagination={{ pageSize: 10 }}
          rowKey={(record) => record.id}
          expandedRowRender={this.expandedRowRender}
          />
        <Button onClick={this.submitFile} type="primary">Submit</Button>
      </div>
    )
  }
}

export default FileInfo
