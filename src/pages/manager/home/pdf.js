import React, {Component} from 'react'
import { Document, Page } from 'react-pdf'
import { Pagination } from 'antd';
class PDFReader extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
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
        >
          <Page width={900} pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    )
  }
}
export default PDFReader