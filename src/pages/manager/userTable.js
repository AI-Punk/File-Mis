import React, {Component} from 'react'
import { Table } from 'antd'
const columns = [
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: 'date',
    dataIndex: 'date',
    key: 'date'
  }
]
class UserTable extends Component {
  render () {
    const {dataSource} = this.props
    return (
      <Table columns={columns} dataSource={dataSource} />
    )
  }
}

export default UserTable
