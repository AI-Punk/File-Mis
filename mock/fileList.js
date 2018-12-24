export default function getFileList (req, res) {
  let fileList = []
  for (let i = 0; i < 10; i++) {
    fileList.push({
      id: 'fileid-' + i,
      title: 'file-' + parseInt(Math.random() * 10, 10),
      createDate: '2018-11-' + i,
      content: 'this is a test file',
      creater: 'root',
      type: 'pdf'
    })
  }
  res.json({
    success: true,
    data: fileList
  })
}