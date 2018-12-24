import React, {Component} from 'react'
import { Table, Divider, Button } from 'antd'
function columnWrapper (self) {
  return [
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'create date',
      dataIndex: 'createDate',
      key: 'createDate'
    },
    {
      title: 'auth time limit',
      dataIndex: 'limit',
      key: 'limit'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <span>
          {/* <a onClick={self.editCol.bind(self, record)}>Edit</a> */}
          <a onClick={() => {self.editCol(record)}}>Edit</a>
          <Divider type="vertical" />
          <a onClick={() => {self.deleteUser(record)}}>Delete</a>
        </span>
      )
    }
  ]
}
class UserTable extends Component {
  editCol = (record) => {
    console.log('edit', record)
    let index = this.props.dataSource.indexOf(record)
    this.props.dispatch({
      type: 'manager/getUser',
      payload: {
        userId: record.id
      }
    })
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: 'userInfo',
        currentUser: index
      }
    })
  }
  deleteUser = (record) => {
    this.props.dispatch({
      type: 'manager/deleteUser',
      payload: {
        id: record.id
      }
    })
  }
  addUser = () => {
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: 'userInfo',
        currentFile: -1
      }
    })
  }
  render () {
    const {dataSource} = this.props
    return (
      <div>
        <Button type="primary" icon="user-add" onClick={this.addUser}>Add User</Button>
        <Table style={{marginTop: '1rem'}} columns={columnWrapper(this)} dataSource={dataSource} rowKey={(record) => record.id} />
      </div>
    )
  }
}

export default UserTable
