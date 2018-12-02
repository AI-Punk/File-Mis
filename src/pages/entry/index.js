import React, {Component} from 'react'
import Login from './login'
import Signup from './signup'
import './index.css'
class Entry extends Component {
  changeMode = (mode) => {
    this.props.dispatch({
      type: 'entry/save',
      payload: {
        mode
      }
    })
  }
  render () {
    const Segments = [
      <Login className="components-form-demo-normal-login"
        dispatch={this.props.dispatch}
        changeMode={this.changeMode} />,
      <Signup
        dispatch={this.props.dispatch}
        changeMode={this.changeMode} />
    ]
    return (
      <div className="entry-segment">
        {Segments[this.props.mode]}
      </div>
    )
  }
}

export default Entry
