import React, {Component} from 'react'
import { Form, Input, Row, Col, Slider, InputNumber, Button, Table } from 'antd'
const FormItem = Form.Item
const {TextArea} = Input
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
    let selectedRowKeys = authUserList.map(authUser => {
      return authUser.id
    })
    console.log('init select', selectedRowKeys, authUserList)
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
  UNSAFE_componentWillReceiveProps (props) {
    const {
      id = -1,
      authUserList = [],
      title = '',
      content = '',
      dataSource,
      type = 'null'
    } = props
    let selectedRowKeys = authUserList.map(authUser => {
      return authUser.id
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
    this.setState({
      id,
      selectedRowKeys,
      authUserList: mapAuthUserList,
      title,
      content,
      file: null,
      type
    })
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
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: 'fileList'
      }
    })
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
      authUserList
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
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    } 
    const {dataSource} = this.props
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
        <Table style={{marginTop: '10px'}}
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
