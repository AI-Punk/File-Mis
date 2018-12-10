import React, {Component} from 'react'
import { Table, Divider, Button } from 'antd'
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
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => {self.editCol(record)}}>Edit</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      )
    }
  ]
}
class FileTable extends Component {
  editCol = (record) => {
    let index = this.props.dataSource.indexOf(record)
    this.props.dispatch({
      type: 'manager/getFile',
      payload: {
        fileId: record.id
      }
    })
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentFile: index
      }
    })
  }
  addFile = () => {
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: 'fileInfo',
        currentFile: -1
      }
    })
  }
  render () {
    const {dataSource} = this.props
    return (
      <div>
        <Button type="primary" icon="plus" onClick={this.addFile}>Add</Button>
        <Table columns={columnWrapper(this)} dataSource={dataSource} rowKey={(record) => record.id} />
      </div>
    )
  }
}

export default FileTable
