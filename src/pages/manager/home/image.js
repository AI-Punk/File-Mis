import React from 'react';

function ImageReader (props) {
  const {src, limit} = props
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
