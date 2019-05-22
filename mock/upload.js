export default function upload (req, res) {
  res.json({
    success: true,
    data: {
      id: 'file' + 1000 * Math.random()
    }
  })
}