import React, {Component} from 'react'
class PDFReader extends Component {
  render () {
    return (
      <iframe style={{width: '100%', height: '540px'}} src={this.props.src} title="file"></iframe>
    )
  }
}
export default PDFReader