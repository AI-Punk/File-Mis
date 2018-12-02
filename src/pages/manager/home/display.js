import React, {Component} from 'react'
import { Layout } from 'antd'
import { connect } from 'dva'
import PDFReader from './pdf.js'
import VideoReader from './video.js'
const { Header, Content } = Layout
function readers (type, props) {
  const readerMap = {
    'pdf': <PDFReader {...props} />,
    'mp4': <VideoReader {...props} />
  }
  return readerMap[type]
}
class DisplayPage extends Component {
  render () {
    const currentFile = this.props.fileInfo
    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <h2>{ currentFile.title }</h2>
          <p>{ currentFile.content }</p>
        </Header>
        <Content>
          { readers(currentFile.type, {src: currentFile.src, limit: currentFile.limit}) }
        </Content>
      </Layout>
    )
  }
}
function mapStateToProps (state) {
  return state.manager
}
export default connect(mapStateToProps)(DisplayPage)
