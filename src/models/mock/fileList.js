let fileList = []
for (let i = 0; i < 10; i++) {
  fileList.push({
    id: i,
    title: 'file-' + parseInt(Math.random() * 10, 10),
    createDate: '2018-11-' + i,
    content: 'this is a test file',
    creater: 'root',
    type: 'pdf'
  })
}

export default fileList