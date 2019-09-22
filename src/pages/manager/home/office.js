import React, { Component } from 'react';
import './office.css';
var mammoth = require('mammoth');

function handleFileSelect(event){
    let options = {
      styleMap:[
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
        "p[style-name='Heading 4'] => h4:fresh",
        "p[style-name='Section Title'] => h1:fresh",
        "p[style-name='Subsection Title'] => h2:fresh",
        "p[style-name='Heading']=>h1:fresh",
        "b => strong",
        "i => em",
        "u => u"
      ]
    }
    readFileInputEventAsArrayBuffer(event,  function temp(arrayBuffer){
        mammoth.convertToHtml({arrayBuffer: arrayBuffer},options)
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
    // console.log(result.value);
    container.innerHTML = result.value;
};
class OfficeReader extends Component {
  state = {
    html: null,
    message: null
  };

  render(){
    return(
      <div id='wordReader' style={{fontSize:'1rem',height: '600px', overflowY: 'auto'}}>

      </div>
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
