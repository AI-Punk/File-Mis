import React, {Component} from 'react'
import { message } from 'antd'

class AudioReader extends Component {
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
  timeLimit = (ev) => {
    if (this.props.timeLimit>this.refs.video.duration*this.props.limit){
      if (ev.target.currentTime > this.refs.video.duration * this.props.limit) {
        this.refs.video.currentTime = 0;
        message.error(`You only have ${Math.round(this.props.limit * 100)} % access of this resource.`);
        this.changeWindow('home');
      }
    }
    else {
      if (ev.target.currentTime > this.props.timeLimit) {
        this.refs.video.currentTime = 0;
        message.error(`You only have ${Math.round(this.props.timeLimit/this.refs.video.duration * 100)} % access of this resource.`);
        this.changeWindow('home');
      }
    }
  }
  render () {
    return (
      <audio ref="audio" onTimeUpdate={this.timeLimit} src={this.props.src} controls style={{width: '100%'}} controlslist="nodownload"></audio>
    )
  }
}
export default AudioReader
