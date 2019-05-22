import React, {Component} from 'react'
import {Menu, Dropdown, Icon} from 'antd'
import {cookie} from 'cookie_js'
import image from '../../../assets/yay.jpg'
import './userMenu.css'

class UserMenu extends Component {
  renderMenu = () => {
    return (
      <Menu onClick={this.logout}>
        <Menu.Item key="1">
          <Icon type="logout" />Logout
        </Menu.Item>
      </Menu>
    )
  }
  logout = ({key}) => {
    if (key === "1") {
      this.props.dispatch({
        type: 'manager/logout'
      })
    }
  }
  render () {
    const username = cookie.get('username')
    return (
      <div>
        <Dropdown overlay={this.renderMenu()} placement="bottomLeft">
            <div style={{height:'60px'}}>
              <div className="user-avatar">
                <img src={image} alt="" />
              </div>
              <div className="user-title">{username}</div>
            </div>
        </Dropdown>
      </div>
    )
  }
}

export default UserMenu
