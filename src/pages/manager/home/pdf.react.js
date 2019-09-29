import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { message } from 'antd';

class MyApp extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    wdith: 600,
    timeStop:null
  }
  changeWindow = (site) => {
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow: site
      }
    })
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  onChange = (pageNumber) => {
    this.setState({pageNumber})
  }

  getAllPages = () => {
    const { numPages, width } = this.state;
    const pages = [];
    if (numPages !== null) {
        for (let i = 1; i <= numPages; i++) {
            pages.push(<Page width={width} pageNumber={i} renderTextLayer={false} />);
        }
    }
    return pages;
  }

  render() {
    return (
      <div id="pdf-reader" style={{height: '600px', overflowY: 'auto'}}>
        <Document
          file={this.props.src}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          {
              this.getAllPages()
          }
        </Document>
      </div>
    );
  }
  componentDidMount () {
    const container = document.getElementById('pdf-reader');
    const width = parseInt(window.getComputedStyle(container).getPropertyValue('width').slice(0, -2), 10);
    this.setState({
        width: width - 10
    })
    this.timeStop=setTimeout(()=>{this.changeWindow('home');message.error(`You only have ${this.props.timeLimit}s access of this resource.`);},this.props.timeLimit*1000);
  }
  componentWillUnmount(){
    clearTimeout(this.timeStop);
  }
}

export default MyApp;
