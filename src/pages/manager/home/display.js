import React, {Component} from 'react'
import { Layout, message } from 'antd'
import { connect } from 'dva'
import PDFReader from './pdf.react.js'
import VideoReader from './video.js'
import AudioReader from './audio.js'
import ImageReader from './image.js'
import OfficeReader from './office.js'
import './display.css'
const { Header, Content } = Layout
function readers (type, props) {
  const readerMap = {
    'pdf': <PDFReader {...props} dispatch={props.dispatch}/>,
    'mp4': <VideoReader {...props} dispatch={props.dispatch}/>,
    'mp3': <AudioReader {...props} dispatch={props.dispatch}/>,
    'avi': <VideoReader {...props} dispatch={props.dispatch}/>,
    'flv': <VideoReader {...props} dispatch={props.dispatch}/>,
    'asf': <VideoReader {...props} dispatch={props.dispatch}/>,
    'wav': <VideoReader {...props} dispatch={props.dispatch}/>,
    'siff': <VideoReader {...props} dispatch={props.dispatch}/>,
    'png': <ImageReader {...props} dispatch={props.dispatch}/>,
    'jpg': <ImageReader {...props} dispatch={props.dispatch}/>,
    'gif': <ImageReader {...props} dispatch={props.dispatch}/>,
    'jpeg': <ImageReader {...props} dispatch={props.dispatch}/>,
    'docx':<OfficeReader {...props} dispatch={props.dispatch}/>,
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
    return (
      <Layout>
        <div id='attention'><em><strong>you just can access this file once, you just have {(currentFile.timeLimit >= 60 ? (parseInt(currentFile.timeLimit/60,0)+'min '+ (currentFile.timeLimit%60 === 0? '': currentFile.timeLimit%60+'s')): currentFile.timeLimit+'s')} to look over this file.</strong></em></div>
        <Header style={{ background: '#fff', padding: 0 }}>
          <h2>{ currentFile.title }</h2>
        </Header>
        <Content>
          { readers(currentFile.type, {src: currentFile.src, limit: currentFile.limit, timeLimit: currentFile.timeLimit,dispatch:this.props.dispatch}) }
        </Content>
      </Layout>
    )
  }
}
function mapStateToProps (state) {
  return state.manager
}
export default connect(mapStateToProps)(DisplayPage)
