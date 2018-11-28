import React, {Component} from 'react'
import { Table, Divider } from 'antd'
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
      type: 'manager/save',
      payload: {
        currentWindow: 'userInfo',
        currentUser: index
      }
    })
  }
  render () {
    const {dataSource} = this.props
    return (
      <Table columns={columnWrapper(this)} dataSource={dataSource} />
    )
  }
}

export default UserTable
