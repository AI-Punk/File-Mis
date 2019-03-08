import React, {Component} from 'react'
import { Document, Page } from 'react-pdf'
import { Pagination, message } from 'antd';
class PDFReader extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
  onDocumentLoadError = (error) => {
    message.error('Error while loading document! ' + error.message)
  }
  onSourceError = (error) => {
    message.error('Error while retrieving document source! ' + error.message)
  }
  changePage = (page) => {
    let { numPages } = this.state;
    if (page > numPages * this.props.limit) {
      page = 1
    }
    this.setState({
      pageNumber: page
    })
  }
  render () {
    return (
      <iframe style={{width: '100%', height: '540px'}} src={this.props.src} title="file"></iframe>
    )
  }
}
export default PDFReader