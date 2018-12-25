import React, {Component} from 'react'
import { Form, Input, InputNumber, Button, Table, Radio } from 'antd'
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
      limit = null
    } = props
    let selectedRowKeys = authFileList.map(authFile => {
      return authFile.id
    })
    this.state = {
      id,
      selectedRowKeys,
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
      limit = null
    } = props
    let selectedRowKeys = authFileList.map(authFile => {
      return authFile.id
    })
    this.setState({
      id,
      selectedRowKeys,
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
  changeLimit = (limit) => {
    this.setState({
      limit
    })
  }
  submitUser = () => {
    const {
      id,
      selectedRowKeys,
      username,
      email,
      password,
      limit,
      limitMode
    } = this.state
    const { dataSource } = this.props
    let authFileList = selectedRowKeys.map(item => {
      return { id: dataSource[item] }
    }).filter(item => {
      return typeof item.id !== 'undefined'
    })
    this.props.dispatch({
      type: 'manager/postUser',
      payload: {
        id,
        username,
        password,
        email,
        authFileList,
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
                onChange={this.changeLimit}
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
          pagination={{ pageSize: 10 }} />
        <Button type="primary" onClick={this.submitUser}>Submit</Button>
      </div>
    )
  }
}

export default UserInfo
