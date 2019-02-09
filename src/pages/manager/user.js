import React, {Component} from 'react'
import { Form, Input, InputNumber, Button, Table, Radio, Row, Col, Slider } from 'antd'
const FormItem = Form.Item
// const Option = Select.Option
const RadioGroup = Radio.Group;
function columnWrapper (self) {
  return [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'createDate',
      dataIndex: 'createDate',
      key: 'createDate'
    }
  ]
}
class UserInfo extends Component {
  constructor (props) {
    super(props)
    const {
      id = -1,
      authFileList = [],
      username = '',
      email = '',
      dataSource,
      limit = null
    } = props
    let selectedRowKeys = authFileList.map(authFile => {
      return authFile.id
    })
    let mapAuthFileList = dataSource.map(record => {
      let limit = 1
      let findIndex = authFileList.findIndex(item => {return item.id === record.id})
      if (findIndex > -1) {
        limit = authFileList[findIndex].limit || 0
      }
      return {
        id: record.id,
        limit
      }
    })
    this.state = {
      id,
      selectedRowKeys,
      authFileList: mapAuthFileList,
      username,
      password: '',
      email,
      limitMode: limit === null ? false : true,
      limit: limit === null ? 60 : limit
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    const {
      id = -1,
      authFileList = [],
      username = '',
      email = '',
      limit = null,
      dataSource
    } = props
    let selectedRowKeys = authFileList.map(authFile => {
      return authFile.id
    })
    let mapAuthFileList = dataSource.map(record => {
      let limit = 1
      let findIndex = authFileList.findIndex(item => {return item.id === record.id})
      if (findIndex > -1) {
        limit = authFileList[findIndex].limit || 0
      }
      return {
        id: record.id,
        limit
      }
    })
    this.setState({
      id,
      selectedRowKeys,
      authFileList: mapAuthFileList,
      username,
      password: '',
      email,
      limitMode: limit === null ? false : true,
      limit: limit === null ? 60 : limit
    })
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  changeEmail = (e) => {
    const email = e.target.value
    this.setState({
      email
    })
  }
  changeUsername = (e) => {
    const username = e.target.value
    this.setState({
      username
    })
  }
  changePassword = (e) => {
    const password = e.target.value
    this.setState({
      password
    })
  }
  changeLimitMode = (e) => {
    const limitMode = e.target.value
    this.setState({
      limitMode
    })
  }
  changeUserLimit = (limit) => {
    this.setState({
      limit
    })
  }
  changeLimit = (index, value) => {
    const {authUserList} = this.state
    authUserList[index].limit = value
    this.setState({
      authUserList
    })
  }
  submitUser = () => {
    const {
      id,
      selectedRowKeys,
      username,
      email,
      password,
      authFileList,
      limit,
      limitMode
    } = this.state
    let selectedRowKeysToRecords = selectedRowKeys.map(item => {
      return {id: item}
    })
    let mapAuthFileList = authFileList.filter(item => {
      return item.limit > 0
    }).filter(item => {
      return selectedRowKeysToRecords.findIndex(record => {
        return record.id === item.id
      }) > -1
    })
    this.props.dispatch({
      type: 'manager/postUser',
      payload: {
        id,
        username,
        password,
        email,
        authFileList: mapAuthFileList,
        limit: limitMode ? limit : null
      }
    })
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: 'userList'
      }
    })
  }
  expandedRowRender = (record, index) => {
    const {authFileList, selectedRowKeys} = this.state
    // let findIndex = authUserList.findIndex(item => {
    //   return item.id === record.id
    // })
    if (selectedRowKeys.indexOf(record.id) > -1) {
      let limit = authFileList[index].limit
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
    const {selectedRowKeys, email, username, password, id, limitMode, limit} = this.state
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
          <FormItem {...formLayout} label="username">
            <Input value={username} onChange={this.changeUsername} />
          </FormItem>
          <FormItem {...formLayout} label="password">
            <Input disabled={id === -1 ? false: true} value={password} onChange={this.changePassword} />
          </FormItem>
          <FormItem {...formLayout} label="email">
            <Input value={email} onChange={this.changeEmail} />
          </FormItem>
          <FormItem {...formLayout} label="limit mode">
            <RadioGroup value={limitMode} onChange={this.changeLimitMode}>
              <Radio value={true}>limit</Radio>
              <Radio value={false}>unlimit</Radio>
            </RadioGroup>
          </FormItem>
          {
            limitMode ? <FormItem {...formLayout} label="time limit">
              <InputNumber
                defaultValue={3}
                min={0}
                max={100000}
                formatter={value => `${limit}min`}
                parser={value => value.replace('min', '')}
                onChange={this.changeUserLimit}
              />
            </FormItem> : null
          }
        </Form>
        <Table 
          scroll={{ y: 240 }} 
          rowSelection={rowSelection} 
          rowKey={(record) => record.id}
          dataSource={dataSource} 
          columns={columnWrapper(this)}
          expandedRowRender={this.expandedRowRender}
          pagination={{ pageSize: 10 }} />
        <Button type="primary" onClick={this.submitUser}>Submit</Button>
      </div>
    )
  }
}

export default UserInfo
