import userList from './userList'
import fileList from './fileList'
import user from './user'
import file from './file'
import token from './token'
const mock = {
  '//api.center/postUser': userList,
  '//api.center/postFile': fileList,
  '//api.center/getUserList': userList,
  '//api.center/getFileList': fileList,
  '//api.center/getAuthFileList': fileList,
  '//api.center/getAuthUserList': userList,
  '//api.center/postAuthUserList': userList,
  '//api.center/getUser': user,
  '//api.center/getFile': file,
  '//api.center/login': token,
  '//api.center/register': token
}
class MockData {
  constructor (props) {
    const {api} = props
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