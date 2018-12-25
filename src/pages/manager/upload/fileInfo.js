import React, {Component} from 'react'
import {Form, Table, Input, Row, Col, Slider, InputNumber, Pagination, Button} from 'antd'
const FormItem = Form.Item
const {TextArea} = Input
const columnProps = [
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
class FileInfo extends Component {
  constructor (props) {
    super(props)
    const { fileList } = props
    this.state = {
      currentFile: 0,
      fileList
    }
  }
  changeTitle = (e) => {
    const {fileList, currentFile} = this.state
    fileList[currentFile].updateValue({title: e.target.value})
    this.setState({
      fileList
    })
  }
  changeContent = (e) => {
    const {fileList, currentFile} = this.state
    fileList[currentFile].updateValue({content: e.target.value})
    this.setState({
      fileList
    })
  }
  changeFile = (index) => {
    const {fileList, currentFile} = this.state
    this.setState({
      currentFile: index - 1,
      rowSelection: fileList[currentFile].authUserIds
    })
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    const {fileList, currentFile} = this.state
    fileList[currentFile].authUserIds = selectedRowKeys
    this.setState({ fileList });
  }
  changeLimit = (record, value) => {
    const {fileList, currentFile} = this.state
    fileList[currentFile].changeUserAuthTime(record.id, value)
    this.setState({
      fileList
    })
  }
  expandedRowRender = (record, index) => {
    const {fileList, currentFile} = this.state
    const {authUserIds, userList} = fileList[currentFile]
    if (authUserIds.indexOf(record.id) > -1) {
      let limit = userList[index].limit
      return (<Row>
        <Col span={12}>
          <Slider
            min={0}
            max={1}
            onChange={(value) => {this.changeLimit(record, value)}}
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
            onChange={(value) => {this.changeLimit(record, value)}}
          />
        </Col>
      </Row>)
    } else {
      return (<p>choose this row first.</p>)
    }
  }
  confirm = () => {
    const {fileList} = this.state
    const {dispatch} = this.props
    fileList.forEach(file => {
      console.log('auth', file.authUserList, file)
      dispatch({
        type: 'manager/postFile',
        payload: {
          id: file.id,
          title: file.title,
          content: file.content,
          authUserList: file.authUserList,
          file: file.type
        }
      })
    })
    this.props.allowNext()
  }
  render () {
    const {fileList, currentFile} = this.state
    const {authUserIds, title, content, userList} = fileList[currentFile]
    const rowSelection = {
      selectedRowKeys: authUserIds,
      onChange: this.onSelectChange,
    };
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    } 
    return (
      <div>
        <Form layout="horizontal">
          <FormItem {...formLayout} label="title">
            <Input value={title} onChange={this.changeTitle} />
          </FormItem>
          <FormItem {...formLayout} label="content">
            <TextArea value={content} onChange={this.changeContent} />
          </FormItem>
        </Form>
        <Table style={{marginTop: '1rem'}}
          scroll={{ y: 240 }} 
          rowSelection={rowSelection} 
          dataSource={userList} 
          columns={columnProps}
          pagination={{ pageSize: 10 }}
          rowKey={(record) => record.id}
          expandedRowRender={this.expandedRowRender}
          />
        <Pagination defaultCurrent={currentFile + 1} total={fileList.length * 10} onChange={this.changeFile} />
        <Button style={{marginTop: '1rem'}} type="primary" onClick={this.confirm}>Confirm All</Button>
      </div>
    )
  }
}

export default FileInfo