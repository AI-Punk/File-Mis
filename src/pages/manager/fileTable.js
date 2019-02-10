import React, {Component} from 'react'
import { Table, Divider, Button, Tag } from 'antd'
import {getRenderTree} from './transTree'
function columnWrapper (self) {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      render: (text, record) => {
        let color = 'geekblue'
        if (text === 'folder') {
          color = 'green'
        }
        return (<Tag color={color} key={text}>{text.toUpperCase()}</Tag>)
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        if (record.type !== 'folder') {
          return (
            <span>
              <a onClick={() => {self.editCol(record)}}>Edit</a>
              <Divider type="vertical" />
              <a onClick={() => {self.deleteFile(record)}}>Delete</a>
            </span>
          )
        }
      }
    }
  ]
}
class FileTable extends Component {
  constructor (props) {
    super()
    const {dataSource} = props
    this.state = {
      renderTree: getRenderTree(dataSource)
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    const {dataSource} = props
    this.setState({
      renderTree: getRenderTree(dataSource)
    })
  }
  editCol = (record) => {
    let index = this.props.dataSource.findIndex(item => {
      return item.id === record.id
    })
    this.props.dispatch({
      type: 'manager/getFile',
      payload: {
        fileId: record.id
      }
    })
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: 'fileInfo',
        currentFile: index
      }
    })
  }
  deleteFile = (record) => {
    this.props.dispatch({
      type: 'manager/deleteFile',
      payload: {
        id: record.id
      }
    })
  }
  addFile = () => {
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: 'upload',
        currentFile: -1
      }
    })
  }
  render () {
    const {renderTree} = this.state
    console.log(renderTree)
    return (
      <div>
        <Button type="primary" icon="upload" onClick={this.addFile}>Upload</Button>
        <Button type="primary" icon="plus" style={{marginLeft: '10px'}}>Add Folder</Button>
        <Table style={{marginTop: '1rem'}}
          columns={columnWrapper(this)}
          dataSource={renderTree.children}
          // expandedRowRender={this.dfsRender}
          // rowKey={(record, index) => {return record.name + index}}
          />
      </div>
    )
  }
}

export default FileTable
