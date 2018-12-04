// import fetch from 'dva/fetch'
import fetch from './mock/index'
export default {

  namespace: 'manager',

  state: {
    userList: [],
    fileList: [],
    userInfo: {},
    fileInfo: {},
    authUserList: [],
    authFileList: [],
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
      let res = yield call(fetch, '//api.center/postFile', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(payload)
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'getFileList' })
      }
    },
    *postUser({ payload }, {call, put}) {
      // handle both create and update
      let res = yield call(fetch, '//api.center/postUser', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(payload)
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'getFileList' })
      }
    },
    *getFileList(action, {call, put}) {
      let res = yield call(fetch, '//api.center/getFileList', {
        method: 'get',
        credentials: "include"
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {fileList: result.data} })
      }
    },
    *getUserList(action, {call, put}) {
      let res = yield call(fetch, '//api.center/getUserList', {
        method: 'get',
        credentials: "include"
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {userList: result.data} })
      }
    },
    *getUser({ payload }, {call, put}) {
      const { userId } = payload
      let res = yield call(fetch, '//api.center/getUser', {
        method: 'post',
        credentials: "include",
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
            currentWindow: 'userInfo',
            userInfo: result.data
          }
        })
      }
    },
    *getFile({ payload }, {call, put}) {
      const { fileId } = payload
      let res = yield call(fetch, '//api.center/getFile', {
        method: 'post',
        credentials: "include",
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
            currentWindow: 'fileInfo',
            fileInfo: result.data
          }
        })
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
