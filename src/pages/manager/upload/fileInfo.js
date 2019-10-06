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
  confirm = () => {
    const {fileList} = this.state
    const {dispatch} = this.props
    fileList.forEach(file => {
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
        <Button style={{marginTop: '1rem'}} type="primary" onClick={this.confirm}>Confirm All</Button>
      </div>
    )
  }
}

export default FileInfo
