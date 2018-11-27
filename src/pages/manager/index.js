import React, { Component } from 'react';
import MainMenu from './menu'
// import ResourceSegment from './resource/index.js'
// import VideoSegment from './video/index.js'
// import PageLocation from './pageLocation.js'
import { Layout, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
// const Segments = [<ResourceSegment />, <VideoSegment />]
class ManagerPage extends Component {
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
          ==
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default ManagerPage
