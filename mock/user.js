export default function getUser (req, res) {
  let data = {
    id: 10,
    username: 'Alice',
    email: 'Alice@bjtu.com',
    createDate: '2018-11-30',
    authFileList: [
      { id: 'fileid-2', limit: 0.1 },
      { id: 'fileid-3', limit: 0.4 }
    ],
    limit: 120
  } 
  res.json({
    success: true,
    data
  })
}