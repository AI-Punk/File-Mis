import fetch from 'dva/fetch'
// import fetch from './mock/index'
import {message} from 'antd'
import Config from '../config'
const {getURL} = Config
export default {

  namespace: 'manager',

  state: {
    userList: [],
    fileList: [],
    userInfo: {},
    fileInfo: {},
    authUserList: [],
    authFileList: [],
    uploadGroup: [],
    currentUser: 0,
    currentFile: 0,
    currentWindow: 'home'
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *postFile({ payload }, {call, put}) {
      // handle both create and update
      console.log('postfile', payload)
      let res = yield call(fetch, getURL('postFile'), {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'getFileList' })
        yield put({ type: 'save', payload: {fileInfo: result.data} })
        message.success('[Edit File Info]success!')
      } else {
        message.error('[Server Error| postFile]:' + result.data)
      }
    },
    *postUser({ payload }, {call, put}) {
      // handle both create and update
      let res = yield call(fetch, getURL('postUser'), {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'getUserList' })
        yield put({ type: 'save', payload: {currentWindow: 'userList' } })
        message.success('success!')
      } else {
        message.error('[Server Error | postUser]:' + result.data)
      }
    },
    *deleteFile ({payload}, {call, put}) {
      let res = yield call(fetch, getURL('deleteFile'), {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'getFileList' })
        message.success('success!')
      } else {
        message.error('[Server Error| deleteFile]:' + result.data)
      }
    },
    *deleteUser ({payload}, {call, put}) {
      let res = yield call(fetch, getURL('deleteUser'), {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'getUserList' })
        message.success('success!')
      } else {
        message.error('[Server Error| deleteUser]:' + result.data)
      }
    },
    *getFileList(action, {call, put}) {
      let res = yield call(fetch, getURL('getFileList'), {
        method: 'get',
        credentials: 'include'
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {fileList: result.data} })
      } else {
        message.error('[Server Error | getFileList]:' + result.data)
      }
    },
    *getUserList(action, {call, put}) {
      let res = yield call(fetch, getURL('getUserList'), {
        method: 'get',
        credentials: 'include'
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {userList: result.data} })
      } else {
        message.error('[Server Error | getUserList]:' + result.data)
      }
    },
    *getUser({ payload }, {call, put}) {
      const { userId } = payload
      let res = yield call(fetch, getURL('getUser'), {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId})
      })
      let result = yield res.json()
      if (result.success) {
        yield put({
          type: 'save',
          payload: {
            userInfo: {
              id: userId,
              ...result.data
            }
          }
        })
      } else {
        message.error('[Server Error | getUser]:' + result.data)
      }
    },
    *getFile({ payload }, {call, put}) {
      const { fileId } = payload
      let res = yield call(fetch, getURL('getFile'), {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({fileId})
      })
      let result = yield res.json()
      if (result.success) {
        yield put({
          type: 'save',
          payload: {
            fileInfo: {
              id: fileId,
              ...result.data
            }
          }
        })
      } else {
        message.error('[Server Error | getFile]:' + result.data)
      }
    },
    *addFolder ({payload}, {call, put}) {
      const {group, folderName, dataSource} = payload
      const fileList = [...dataSource]
      fileList.push({
        id: '_fake_',
        title: '..',
        type: 'fake',
        group: group.concat(folderName)
      })
      yield put({
        type: 'postFileList', 
        payload: {fileList}
      })
    },
    *moveFile ({payload}, {call, put}) {
      const {movingIndex, targetGroup, dataSource} = payload
      const fileList = [...dataSource]
      if (typeof movingIndex === 'number') {
        fileList[movingIndex].group = targetGroup
      } else if (movingIndex instanceof Array) {
        fileList.forEach(file => {
          if (movingIndex.every((g, i) => {
            return g === file.group[i]
          })) {
            file.group = [...targetGroup, ...movingIndex.slice(-1)]
          }
        })
      }
      yield put({
        type: 'postFileList', 
        payload: {fileList}
      })
    },
    *postFileList({payload}, {call, put}) {
      const fileList = payload.fileList.map(record => {
        return {
          id: record.id,
          group: record.group
        }
      })
      console.log('fileList', fileList)
      let res, result;
      try {
        res = yield call(fetch, getURL('postFileList'), {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(fileList)
        })
        result = yield res.json()
      } catch (error) {
        result = {success: false, data: error.toString()}
      } finally {
        if (result.success) {
          message.success('success!')
          yield put({
            type: 'save',
            payload: {
              fileList: payload.fileList
            }
          })
        } else {
          yield put({ type: 'getFileList' })
          message.error('[Server Error| postFileList]:' + result.data)
        }
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    displayFile (state, { index }) {
      console.log('model', index)
      return {
        ...state,
        currentFile: index,
        currentWindow: 1
      }
    },
    changePos (state, { pos }) {
      return {
        ...state,
        currentWindow: pos
      }
    },
    displayUser (state, {index}) {
      return {
        ...state,
        currentUser: index,
        currentWindow: 'user'
      }
    },
    updateFileList (state, {fileList}) {
      return {
        ...state,
        fileList
      }
    },
    updateUserList (state, {userList}) {
      return {
        ...state,
        userList
      }
    }
  }
};
