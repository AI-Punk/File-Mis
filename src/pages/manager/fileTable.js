import React, {Component} from 'react'
import { Table, Divider, Button, Tag, Modal, Input, Form, Icon, Tooltip } from 'antd'
import {getRenderTree} from './transTree'
const ClickIcon = {
  cursor: 'pointer'
}
const COLS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => {
      if (a > b) {
        return -1
      } else if (a === b) {
        return 0
      } else {
        return 1
      }
    }
  }
]
function columnWrapper (self) {
  return [
    ...COLS,
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
              <Tooltip title="Edit">
                <Icon style={ClickIcon} onClick={() => {self.editCol(record)}} type="edit" />
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Delete">
                <Icon style={ClickIcon} onClick={() => {self.deleteFile(record)}} type="delete" />
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Move">
                <Button size="small" shape="circle" type="primary" onClick={() => {self.showMove(record)}}>
                  <Icon style={ClickIcon} type="file-sync" />
                </Button>
              </Tooltip>
            </span>
          )
        } else {
          return (
            <span>
              <Tooltip title="Add Folder">
                <Button size="small" shape="circle" onClick={() => {self.showModal(record.group)}}>
                  <Icon type="folder-add" />
                </Button>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Move">
                <Button size="small" shape="circle" type="primary" onClick={() => {self.showMove(record)}}>
                  <Icon type="file-sync" />
                </Button>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Upload">
                <Button size="small" shape="circle" onClick={() => {self.addFile(record)}}>
                  <Icon type="upload" />
                </Button>
              </Tooltip>
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
    const {renderTree, hashTree, folderTree} = getRenderTree(dataSource)
    this.state = {
      renderTree,
      hashTree,
      folderTree,
      selectedRowKeys: [],
      showModal: false,
      showMove: false,
      movingIndex: -1,
      targetGroup: [],
      group: [],
      folderName: 'New Folder'
    }
    console.log('state', this.state)
  }
  UNSAFE_componentWillReceiveProps (props) {
    const {dataSource} = props
    const {renderTree, hashTree, folderTree} = getRenderTree(dataSource)
    this.setState({
      renderTree,
      folderTree,
      hashTree
    })
    console.log('state', this.state)
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
  addFile = (record) => {
    const {group = []} = record
    console.log('c1', this.state.fileList)
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: 'upload',
        currentFile: -1,
        uploadGroup: group
      }
    })
  }
  showModal = (group = []) => {
    this.setState({
      showModal: true,
      group
    })
  }
  showMove = (record) => {
    if (record.type === 'folder') {
      this.setState({
        showMove: true,
        movingIndex: record.group
      })
    } else {
      let movingIndex = this.props.dataSource.findIndex(item => {
        return item.id === record.id
      })
      this.setState({
        showMove: true,
        movingIndex
      })
    }
  }
  hideModal = () => {
    this.setState({
      showModal: false
    })
  }
  hideMove = () => {
    this.setState({
      showMove: false,
      selectedRowKeys: []
    })
  }
  addFolder = () => {
    const {group, hashTree} = this.state
    let { folderName } = this.state
    console.log('group', group)
    // should check if there is any folder has the same name. auto adjust the foldername.
    if (hashTree.hasNode(group.concat(folderName))) {
      folderName = folderName + '(1)'
    }
    console.log('fileList', this.props.dataSource)
    this.props.dispatch({
      type: 'manager/addFolder',
      payload: {
        group,
        folderName,
        dataSource: this.props.dataSource
      }
    })
    this.hideModal()
  }
  handleMovement = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows)
    if (selectedRowKeys.length > 0) {
      this.setState({
        selectedRowKeys: selectedRowKeys.slice(-1),
        targetGroup: selectedRows.slice(-1)[0].group
      })
    }
  }
  moveFile = () => {
    const {movingIndex, targetGroup} = this.state
    this.props.dispatch({
      type: 'manager/moveFile',
      payload: {
        movingIndex,
        targetGroup,
        dataSource: this.props.dataSource
      }
    })
    this.hideMove()
  }
  render () {
    const {renderTree, showModal, showMove, folderName, folderTree, selectedRowKeys} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleMovement,
    };
    console.log(renderTree, folderTree)
    return (
      <div>
        <Button type="primary" icon="upload" onClick={() => {this.addFile({})}}>Upload</Button>
        <Button type="primary" icon="plus" style={{marginLeft: '10px'}} onClick={() => {this.showModal([])}}>Add Folder</Button>
        <Table style={{marginTop: '1rem'}}
          columns={columnWrapper(this)}
          dataSource={renderTree.children}
          rowKey={record => record.id}
          />
          <Modal
            onOk={this.addFolder}
            onCancel={this.hideModal}
            visible={showModal} title="add a new folder">
            <Form>
              <Form.Item label="folder name">
                <Input onChange={(e) => {this.setState({folderName: e.target.value})}} value={folderName} />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            onOk={this.moveFile}
            onCancel={this.hideMove}
            visible={showMove} title="move to a new place">
            <Table style={{marginTop: '1rem'}}
              rowSelection={rowSelection}
              columns={COLS}
              dataSource={[folderTree]}
              rowKey={record => record.id}
              />
          </Modal>
      </div>
    )
  }
}

export default FileTable
