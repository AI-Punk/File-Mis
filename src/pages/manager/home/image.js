import React, {Component} from 'react';
import { message } from 'antd';


class ImageReader extends Component {
  state = {
    timeStop:null
  }
  changeWindow = (site) => {
    this.props.dispatch({
      type: 'manager/getFileList'
    })
    this.props.dispatch({
      type: 'manager/save',
      payload: {
        currentWindow:site
      }
    })
  }
  render(){
    const {src, limit} = this.props
    this.timeStop=setTimeout(()=>{this.changeWindow('home');message.error(`You only have ${this.props.timeLimit}s access of this resource.`);},this.props.timeLimit*1000);
    return (
      <img src={limit > 0 ? src : ''}
      style={
        {
          wdith: "100%"
        }
      }
      alt="you do not have access to this img/internet error"></img>
    )
  }
  componentWillUnmount(){
    clearTimeout(this.timeStop);
  }
}
export default ImageReader
