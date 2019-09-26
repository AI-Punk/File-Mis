import React, {Component} from 'react';
import { message } from 'antd';

class VideoReader extends Component {
  timeLimit = (ev) => {
    if (ev.target.currentTime > this.refs.video.duration * this.props.limit) {
      this.refs.video.currentTime = 0;
      message.error(`You only have ${Math.round(this.props.limit * 100)} % access of this resource.`);
    }
  }
  render () {
    return (
      <video ref="video" onTimeUpdate={this.timeLimit} src={this.props.src} controls style={{width: '100%'}} controlslist="nodownload"></video>
    )
  }
}
export default VideoReader
