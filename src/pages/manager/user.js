import React, {Component} from 'react'
import { Form, Input, Button, Table } from 'antd'
const FormItem = Form.Item
// const Option = Select.Option
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
      // password = '',
      email = '',
      dataSource
    } = props
    let selectedRowKeys = authFileList.map(authFile => {
      return dataSource.findIndex(file => {
        return authFile.id === file.id
      })
    }).filter(item => {
      return item >= 0
    })
    this.state = {
      id,
      selectedRowKeys,
      username,
      password: '',
      email
    }
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
  submitUser = () => {
    const {
      id,
      selectedRowKeys,
      username,
      email
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
        email,
        authFileList
      }
    })
  }
  render () {
    const {selectedRowKeys, email, username} = this.state
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
            <Input disabled={true} />
          </FormItem>
          <FormItem label="email">
            <Input value={email} onChange={this.changeEmail} />
          </FormItem>
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
