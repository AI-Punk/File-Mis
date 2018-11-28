import userList from './userList'
import fileList from './fileList'
const mock = {
  '//api.center/postUser': userList,
  '//api.center/postFile': fileList,
  '//api.center/getUserList': userList,
  '//api.center/getFileList': fileList,
  '//api.center/getAuthFileList': fileList,
  '//api.center/getAuthUserList': userList,
  '//api.center/postAuthUserList': userList,
  '//api.center/getUser': userList,
  '//api.center/getFile': fileList
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