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
      title: 'createDate',
      dataIndex: 'createDate',
      key: 'createDate'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <span>
          {/* <a onClick={self.editCol.bind(self, record)}>Edit</a> */}
          <a onClick={() => {self.editCol(record)}}>Edit</a>
          <Divider type="vertical" />
          <a>Delete</a>
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
        currentUser: index
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
        <Button type="primary" icon="plus" onClick={this.addUser}>Add User</Button>
        <Table columns={columnWrapper(this)} dataSource={dataSource} rowKey={(record) => record.id} />
      </div>
    )
  }
}

export default UserTable
