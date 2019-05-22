import React, {Component} from 'react'
class PDFReader extends Component {
  render () {
    return (
      <iframe id="pdf-reader" frameBorder="1" style={{width: '100%', height: '540px'}} src={this.props.src + '#toolbar=0&navpanes=0'} title="file"></iframe>
    )
  }
}
export default PDFReader