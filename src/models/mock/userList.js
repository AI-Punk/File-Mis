let userList = []
for (let i = 0; i < 10; i++) {
  userList.push({
    id: i,
    username: 'user-' + parseInt(Math.random() * 10),
    email: 'user-' + parseInt(Math.random() * 10) + '@bjtu.edu',
    createDate: '2018-11-' + i
  })
}

export default userList