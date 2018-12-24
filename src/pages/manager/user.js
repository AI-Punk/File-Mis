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
    const { dataSource } = this.prop
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
  }
  render () {
    const {selectedRowKeys, email, username, password, id, limitMode, limit} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const {dataSource} = this.props
    return (
      <div>
        <Form>
          <FormItem label="username">
            <Input value={username} onChange={this.changeUsername} />
          </FormItem>
          <FormItem label="password">
            <Input disabled={id === -1 ? false: true} value={password} onChange={this.changePassword} />
          </FormItem>
          <FormItem label="email">
            <Input value={email} onChange={this.changeEmail} />
          </FormItem>
          <FormItem label="limit mode">
            <RadioGroup value={limitMode} onChange={this.changeLimitMode}>
              <Radio value={true}>limit</Radio>
              <Radio value={false}>unlimit</Radio>
            </RadioGroup>
          </FormItem>
          {
            limitMode ? <FormItem label="access time limit (min)">
              <InputNumber
                defaultValue={3}
                min={0}
                max={365}
                formatter={value => `${limit}d`}
                parser={value => value.replace('d', '')}
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
