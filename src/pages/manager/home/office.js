import React, { Component } from 'react';
import './office.css';
var mammoth = require('mammoth');

function handleFileSelect(event,element){
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
    readFileInputEventAsArrayBuffer(event, element, function temp(arrayBuffer,element){
        mammoth.convertToHtml({arrayBuffer: arrayBuffer},options)
            .then((result)=>{displayResult(result,element)})
            .done();
    });
};
function readFileInputEventAsArrayBuffer(event,element, callback){
    let file = event;

    let reader = new FileReader();

    reader.onload = function(loadEvent) {
        let arrayBuffer = loadEvent.target.result;
        callback(arrayBuffer,element);
    };

    reader.readAsArrayBuffer(file);
};
function displayResult(result,element){
    // console.log(result)
    // console.log(result.value);
    element.innerHTML = result.value;
};
class OfficeReader extends Component {
  state = {
    html: null,
    message: null
  };

  render(){
    return(
      <div ref='wordReader' id='wordReader' style={{fontSize:'1rem',height: '600px', overflowY: 'auto'}}>

      </div>
    );
  }

  componentDidMount (){
    fetch(this.props.src).then(data=>data.blob()).then(blob_data=>handleFileSelect(blob_data,this.refs.wordReader))
  }

}

export default OfficeReader
