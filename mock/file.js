export default function getFile (req, res) {
  let file = {
    id: 8,
    title: 'MIS-file-test',
    content: 'this is a simple test file :)',
    type: 'pdf',
    limit: 1,
    src: 'http://localhost:2000/files/testpdf.pdf',
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