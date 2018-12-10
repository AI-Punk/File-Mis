import userList from './userList'
import fileList from './fileList'
import user from './user'
import file from './file'
import token from './token'
import Config from '../../config'
const {getURL} = Config
const mock = {
  [getURL('postUser')]: userList,
  [getURL('postFile')]: fileList,
  [getURL('getUserList')]: userList,
  [getURL('getFileList')]: fileList,
  [getURL('getAuthFileList')]: fileList,
  [getURL('getAuthUserList')]: userList,
  [getURL('postAuthUserList')]: userList,
  [getURL('getUser')]: user,
  [getURL('getFile')]: file,
  [getURL('login')]: token,
  [getURL('register')]: token
}
class MockData {
  constructor (props) {
    this.data = mock[props.api]
  }
  json () {
    return {
      success: true,
      data: this.data
    }
  }
}
function fetch (api, headers) {
  return new MockData({api})
}

export default fetch