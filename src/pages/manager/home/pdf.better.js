import {useState, userEffect} from 'react'
import pdfjsLib from 'pdfjs-dist'
function pdfReader (props) {
  const {src, limit} = props
  const [pageNumber, usePageNumber] = useState(0)
  userEffect(async() => {
    let loadingTask = pdfjsLib.getDocument(src);
    loadingTask.promise.then(function (pdfDocument) {
      // Request a first page
      return pdfDocument.getPage(pageNumber + 1).then(function (pdfPage) {
        // Display page on the existing canvas with 100% scale.
        let viewport = pdfPage.getViewport({ scale: 1.0, });
        let canvas = document.getElementById('pdf-reader');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        let ctx = canvas.getContext('2d');
        let renderTask = pdfPage.render({
          canvasContext: ctx,
          viewport: viewport,
        });
        return renderTask.promise;
      });
    }).catch(function (reason) {
      console.error('Error: ' + reason);
    });
    
  })
  return (
    <div>
      <canvas id="pdf-reader"></canvas>
    </div>
  )
}
export default pdfReader
