import React, { Component } from 'react';

var mammoth = require('mammoth');
function handleFileSelect(event){
    readFileInputEventAsArrayBuffer(event,  function temp(arrayBuffer){
        mammoth.convertToHtml({arrayBuffer: arrayBuffer})
            .then((result)=>{displayResult(result)})
            .done();
    });
};
function readFileInputEventAsArrayBuffer(event, callback){
    let file = event;

    let reader = new FileReader();

    reader.onload = function(loadEvent) {
        let arrayBuffer = loadEvent.target.result;
        callback(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
};
function displayResult(result){
    // console.log(result)
    const container = document.getElementById('wordReader');
    container.innerHTML = result.value;
};
function escapeHtml(value){
    return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};
class OfficeReader extends Component {
  state = {
    html: null,
    message: null
  };

  render(){
    return(
      <pre id='wordReader' style={{whiteSpace: 'pre-wrap',wordWrap: 'break-word',height: '600px', overflowY: 'auto'}}>

      </pre>
    );
  }

  componentDidMount (){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.props.src, true);
    // console.log(this.props.src);
    xhr.send(null)
    xhr.responseType = 'blob';
    xhr.onreadystatechange = () =>{
      if(xhr.readyState ===4 && xhr.status === 200){
        console.log(xhr.response);
        handleFileSelect(xhr.response);

      }
    }

  }

}

export default OfficeReader
