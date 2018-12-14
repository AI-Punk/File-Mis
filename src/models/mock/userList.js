let userList = []
for (let i = 5; i < 10; i++) {
  userList.push({
    id: i,
    username: 'user-' + i,
    email: 'user-' + parseInt(Math.random() * 10, 10) + '@bjtu.edu',
    createDate: '2018-11-' + i,
    limit: i%3 ? i * 20 : null
  })
}

export default userList