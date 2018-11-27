import React, {Component} from 'react'
import { Menu, Icon } from 'antd'
class MainMenu extends Component {
  changeWindow = (wName) => {
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: wName
      }
    })
  }
  render () {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span>Home Page</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span>Resource Center</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span>User Center</span>
        </Menu.Item>
      </Menu>
    )
  }
}

export default MainMenu
