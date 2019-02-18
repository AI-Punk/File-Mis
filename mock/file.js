export default function getFile (req, res) {
  let file = {
    id: 8,
    title: 'MIS-file-test',
    content: 'this is a simple test file :)',
    // type: 'pdf',
    type: 'jpg',
    limit: 1,
    // src: 'http://localhost:2000/files/testpdf.pdf',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/700px-Tsunami_by_hokusai_19th_century.jpg',
    createDate: '2018-11-30',
    authUserList: [
      { id: 'userid-7', limit: 0.8 },
      { id: 'userid-9', limit: 0.2 }
    ]
  }
  res.json({
    success: true,
    data: file
  })
} 