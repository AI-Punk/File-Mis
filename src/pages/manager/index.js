import React, { Component } from 'react';
import MainMenu from './menu'
import FileTable from './fileTable'
import UserTable from './userTable'
import FileInfo from './file'
import UserInfo from './user'
// import ResourceSegment from './resource/index.js'
// import VideoSegment from './video/index.js'
// import PageLocation from './pageLocation.js'
import { Layout, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
// const Segments = [<ResourceSegment />, <VideoSegment />]
function getSegment (seg, props) {
  let currentUser = props.currentUser > -1 ? props.userInfo : {}
  let currentFile = props.currentFile > -1 ? props.fileInfo : {}
  const Segments = {
    'fileList': <FileTable dataSource={props.fileList} dispatch={props.dispatch} />,
    'userList': <UserTable dataSource={props.userList} dispatch={props.dispatch} />,
    'userInfo': <UserInfo 
      {...currentUser}
      dataSource={props.fileList}
      dispatch={props.dispatch} />,
    'fileInfo': <FileInfo
      {...currentFile}
      dataSource={props.userList}
      dispatch={props.dispatch} />
  }
  return Segments[seg]
}
class ManagerPage extends Component {
  constructor (props) {
    super(props)
    this.props.dispatch({
      type: 'manager/getUserList'
    })
    this.props.dispatch({
      type: 'manager/getFileList'
    })
  }
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    console.log(this.props)
    return (
      <Layout className="home-page">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <MainMenu dispatch={this.props.dispatch} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          {
            getSegment(this.props.currentWindow, this.props)
          }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default ManagerPage
