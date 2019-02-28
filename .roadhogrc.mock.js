
import userList from './mock/userList'
import fileList from './mock/fileList'
import user from './mock/user'
import file from './mock/file'
import token from './mock/login'
import upload from './mock/upload'
import postFileList from './mock/postFileList'
import logout from './mock/logout'
import deleteFolder from './mock/deleteFolder';
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
  'POST /uploadFile': upload,
  'POST /postFileList': postFileList,
  'GET /logOut': logout,
  'POST /deleteFolder': deleteFolder,
  'POST /deleteFile': deleteFolder
};