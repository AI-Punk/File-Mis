import React, {Component} from 'react'
import { Table, Divider } from 'antd'
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
    title: 'createDate',
    dataIndex: 'createDate',
    key: 'createDate'
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Edit</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    )
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
