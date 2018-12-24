
import userList from './mock/userList'
import fileList from './mock/fileList'
import user from './mock/user'
import file from './mock/file'
import token from './mock/login'
import upload from './mock/upload'
export default {
  'POST /postUser': userList,
  'POST /postFile': fileList,
  'GET /getUserList': userList,
  'GET /getFileList': fileList,
  'GET /getAuthFileList': fileList,
  'GET /getAuthUserList': userList,
  'POST /postAuthUserList': userList,
  'POST /getUser': user,
  'POST /getFile': file,
  'POST /login': token,
  'POST /register': token,
  'POST /uploadFile': upload
};