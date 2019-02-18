import React, {Component} from 'react'

class AudioReader extends Component {
  timeLimit = (ev) => {
    if (ev.target.currentTime > this.refs.audio.duration * this.props.limit) {
      this.refs.audio.currentTime = 0
    }
  }
  render () {
    return (
      <audio ref="audio" onTimeUpdate={this.timeLimit} src={this.props.src} controls style={{width: '100%'}} controlslist="nodownload"></audio>
    )
  }
}
export default AudioReader