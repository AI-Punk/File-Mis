import React, {Component} from 'react'
import {Button} from 'antd'
import UserForm from './form'
import AuthFileList from './table'
class UserInfo extends Component {
  constructor (props) {
    super(props)
    const {
      id = -1,
      authFileList = [],
      username = '',
      email = '',
      dataSource,
      limit = null
    } = props
    let selectedRowKeys = authFileList.map(authFile => {
      return authFile.id
    })
    let mapAuthFileList = dataSource.map(record => {
      let limit
      if (record.type !== 'folder') {
        limit = 0
        let findIndex = authFileList.findIndex(item => {return item.id === record.id})
        if (findIndex > -1) {
          limit = authFileList[findIndex].limit || 0
        }
      } else {
        limit = null
        let findIndex = authFileList.findIndex(item => {return item.id === record.id})
        if (findIndex > -1) {
          limit = authFileList[findIndex].limit || null
        }
      }
      return {
        ...record,
        limit
      }
    })
    this.state = {
      id,
      currentRow: {},
      currentRowLimit: 0,
      selectedRowKeys,
      authFileList: mapAuthFileList,
      username,
      password: '',
      email,
      limitMode: limit === null ? false : true,
      limit: limit === null ? 60 : limit,
      defaultMode: false
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    const {
      id = -1,
      authFileList = [],
      username = '',
      email = '',
      limit = null,
      dataSource
    } = props
    let selectedRowKeys = authFileList.map(authFile => {
      return authFile.id
    })
    let mapAuthFileList = dataSource.map(record => {
      let limit
      if (record.type !== 'folder') {
        limit = 0
        let findIndex = authFileList.findIndex(item => {return item.id === record.id})
        if (findIndex > -1) {
          limit = authFileList[findIndex].limit || 0
        }
      } else {
        limit = null
        let findIndex = authFileList.findIndex(item => {return item.id === record.id})
        if (findIndex > -1) {
          limit = authFileList[findIndex].limit || null
        }
      }
      return {
        ...record,
        limit
      }
    })
    this.setState({
      id,
      selectedRowKeys,
      authFileList: mapAuthFileList,
      username,
      password: '',
      email,
      limitMode: limit === null ? false : true,
      limit: limit === null ? 60 : limit
    })
  }
  onSelectChange = (selectedRowKeys) => {
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
  changePassword = (e) => {
    const password = e.target.value
    this.setState({
      password
    })
  }
  changeLimitMode = (e) => {
    const limitMode = e.target.value
    this.setState({
      limitMode
    })
  }
  changeUserLimit = (limit) => {
    this.setState({
      limit
    })
  }
  changeLimit = (index, value) => {
    const {authFileList} = this.state
    authFileList[index].limit = value
    this.setState({
      authFileList
    })
  }
  changeCurrentLimit = (value) => {
    this.setState({
      currentRowLimit: value
    })
  }
  openRow = (record, index) => {
    this.setState({
      showLimitForm: true,
      currentRow: record,
      currentRowLimit: record.limit,
      defaultMode: record.limit !== null
    })
  }
  closeRow = () => {
    this.setState({
      showLimitForm: false
    })
  }
  confirmRow = () => {
    const {currentRow, currentRowLimit, defaultMode, authFileList} = this.state
    let index = authFileList.findIndex(item => {
      return item.id === currentRow.id
    })
    if (defaultMode && index > -1) {
      this.changeLimit(index, currentRowLimit)
    } else {
      this.changeLimit(index, null)
    }
    this.closeRow()
  }
  changeDefaultMode = (value) => {
    this.setState({
      defaultMode: value
    })
  }
  submitUser = () => {
    const {
      id,
      username,
      email,
      password,
      authFileList,
      limit,
      limitMode
    } = this.state
    let mapAuthFileList = authFileList.filter(item => {
      return item.limit > 0 || item.type === 'folder'
    }).map(item => {
      return {
        id: item.id,
        group: item.group,
        limit: item.limit
      }
    })
    this.props.dispatch({
      type: 'manager/postUser',
      payload: {
        id,
        username,
        password,
        email,
        authFileList: mapAuthFileList,
        limit: limitMode ? limit : null
      }
    })
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: 'userList'
      }
    })
  }
  render () {
    const {email, username, password, id, limitMode, limit, authFileList, showLimitForm, currentRow, currentRowLimit, defaultMode} = this.state
    const userFormProps = {
      username,
      email,
      password,
      limit,
      limitMode,
      id,
      changeUsername: this.changeUsername,
      changePassword: this.changePassword,
      changeEmail: this.changeEmail,
      changeLimitMode: this.changeLimitMode,
      changeUserLimit: this.changeUserLimit
    }
    const tableProps = {
      currentRow,
      currentRowLimit,
      showLimitForm,
      changeLimit: this.changeLimit,
      changeCurrentLimit: this.changeCurrentLimit,
      authFileList,
      openRow: this.openRow,
      confirmRow: this.confirmRow,
      closeRow: this.closeRow,
      defaultMode,
      changeDefaultMode: this.changeDefaultMode
    }
    return (
      <div>
        <UserForm {...userFormProps} />
        <AuthFileList {...tableProps} />
        <Button type="primary" onClick={this.submitUser}>Submit</Button>
      </div>
    )
  }
}

export default UserInfo
