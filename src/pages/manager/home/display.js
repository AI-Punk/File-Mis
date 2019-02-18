import React, {Component} from 'react'
import { Layout, message } from 'antd'
import { connect } from 'dva'
import PDFReader from './pdf.js'
import VideoReader from './video.js'
import AudioReader from './audio.js'
import ImageReader from './image.js'
const { Header, Content } = Layout
function readers (type, props) {
  const readerMap = {
    'pdf': <PDFReader {...props} />,
    'mp4': <VideoReader {...props} />,
    'mp3': <AudioReader {...props} />,
    'avi': <VideoReader {...props} />,
    'flv': <VideoReader {...props} />,
    'asf': <VideoReader {...props} />,
    'wav': <VideoReader {...props} />,
    'siff': <VideoReader {...props} />,
    'png': <ImageReader {...props} />,
    'jpg': <ImageReader {...props} />,
    'gif': <ImageReader {...props} />,
    'jpeg': <ImageReader {...props} />,
  }
  if (typeof type === 'undefined') {
    message.warning('File type is not defined')
  } else {
    type = type.toLowerCase()
    if (Object.keys(readerMap).indexOf(type) === -1) {
      message.warning('cannot solve file type of' + type)
    }
  }
  return readerMap[type]
}
class DisplayPage extends Component {
  render () {
    if (Object.keys(this.props.fileInfo).length === 0) {
      return <div>Resource not loaded yet.</div>
    }
    const currentFile = this.props.fileInfo
    console.log('currentFile')
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
