class FileModel {
  constructor (props) {
    const {file, userList} = props
    this.title = file.name
    this.content = file.name
    this.authUserIds = []
    this.userList = userList.map(item => {
      return {
        ...item,
        limit: 1
      }
    })
    this.type = file.name.split('.').slice(-1)[0] || 'null'
    this.id = file.response.data.id
  }
  updateValue (props) {
    const {title , content} = props
    this.title = title || this.title
    this.content = content || this.content
  }
  // userList filter by authUserIds
  get authUserList () {
    let selectedRowKeysToRecords = this.authUserIds.map(item => {
      return {id: item}
    })
    let filterAuthUserList = this.userList.filter(item => {
      return item.limit > 0
    }).filter(item => {
      return selectedRowKeysToRecords.findIndex(record => {
        return record.id === item.id
      }) > -1
    })
    return filterAuthUserList
  }
  changeUserAuthTime (id, limit) {
    let user = this.userList.find(user => {
      return user.id === id
    })
    if (typeof user !== 'undefined') {
      user.limit = limit
    }
  }
}

export default FileModel