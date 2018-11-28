let userList = []
for (let i = 0; i < 10; i++) {
  userList.push({
    username: 'user-' + parseInt(Math.random() * 10),
    createDate: '2018-11-' + i
  })
}

export default userList