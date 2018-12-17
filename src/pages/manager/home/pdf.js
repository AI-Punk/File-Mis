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
    let { pageNumber, numPages } = this.state;
    return (
      <div style={{width: '100%', height: '700px', overflowY: 'auto'}}>
        <Pagination defaultCurrent={1} total={numPages * 10} current={pageNumber} onChange={this.changePage} />
        <Document
          file={this.props.src}
          onLoadSuccess={this.onDocumentLoadSuccess}
          onLoadError={this.onDocumentLoadError}
          onSourceError={this.onSourceError}
        >
          <Page width={900} pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    )
  }
}
export default PDFReader