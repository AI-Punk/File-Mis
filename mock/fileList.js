import randomGroup from './utils/randomGroup'
export default function getFileList (req, res) {
  let fileList = []
  for (let i = 0; i < 10; i++) {
    fileList.push({
      id: 'fileid-' + i,
      title: 'file-' + i,
      createDate: '2018-11-' + i,
      content: 'this is a test file',
      creator: 'root',
      type: 'pdf',
      group: randomGroup('Folder', 3)
    })
  }
  res.json({
    success: true,
    data: fileList
  })
}