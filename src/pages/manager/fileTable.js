import React, {Component} from 'react'
import { Table } from 'antd'
const columns = [
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
    title: 'date',
    dataIndex: 'date',
    key: 'date'
  }
]
class FileTable extends Component {
  render () {
    const {dataSource} = this.props
    return (
      <Table columns={columns} dataSource={dataSource} />
    )
  }
}

export default FileTable
