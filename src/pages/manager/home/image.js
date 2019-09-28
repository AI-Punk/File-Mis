import React from 'react';
import { message } from 'antd';

function changeWindow(site,props){
  props.dispatch({
    type: 'manager/getFileList'
  })
  props.dispatch({
    type: 'manager/save',
    payload: {
      currentWindow:site
    }
  })
}
function ImageReader (props) {
  const {src, limit} = props
  setTimeout(()=>{changeWindow('home',props);message.error(`You only have ${props.timeLimit}s access of this resource.`);},props.timeLimit*1000);
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

export default ImageReader
