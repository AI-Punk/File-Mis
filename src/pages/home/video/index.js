import React, {Component} from 'react'
import { Layout } from 'antd'
import { connect } from 'dva'
const { Header, Content } = Layout
class VideoPage extends Component {
  currentFile () {
    const {currentFile, fileList} = this.props
    return fileList[currentFile]
  }
  render () {
    const currentFile = this.currentFile()
    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <h2>{ currentFile.title }</h2>
          <p>{ currentFile.description }</p>
        </Header>
        <Content>
          <img style={{width: '100%'}} src={currentFile.avatar} alt="nothing"/>
        </Content>
      </Layout>
    )
  }
}
function mapStateToProps (state) {
  console.log('video state', state)
  return state.home
}
export default connect(mapStateToProps)(VideoPage)
