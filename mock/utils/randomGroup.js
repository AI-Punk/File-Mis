function randomGroup (groupname = 'Folder', maxDepth = 0) {
  let ans = []
  const depth = parseInt(Math.random() * maxDepth + 0.4)
  for(let i = 0; i < depth; i++) {
    ans.push(groupname + '-' + (i + 1))
  }
  return ans;
}
// console.log(randomGroup('folder', 3))
export default randomGroup;