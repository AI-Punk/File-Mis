import fetch from 'dva/fetch'
export default {

  namespace: 'manager',

  state: {
    userList: [],
    fileList: [],
    authUserList: [],
    authFileList: [],
    currentUser: 0,
    currentFile: 0,
    currentWindow: 'user'
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *postFile(action, {call, put}) {
      // handle both create and update
      let res = yield call(fetch, '/api.center', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'getFileList' })
      }
    },
    *postUser(action, {call, put}) {
      // handle both create and update
      let res = yield call(fetch, '/api.center', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'getFileList' })
      }
    },
    *getFileList(action, {call, put}) {
      let res = yield call(fetch, '/api.center', {
        method: 'get'
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {fileList: result.data.fileList} })
      }
    },
    *getUserList(action, {call, put}) {
      let res = yield call(fetch, '/api.center', {
        method: 'get'
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {userList: result.data.userList} })
      }
    },
    *getAuthFileList({user}, {call, put}) {
      let res = yield call(fetch, '/api.center', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {authFileList: result.data.authFileList} })
      }
    },
    *getAuthUserList({file}, {call, put}) {
      let res = yield call(fetch, '/api.center', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({file})
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {authUserList: result.data.authUserList} })
      }
    },
    *postAuthFileList({user, authFileList}, {call, put}) {
      let res = yield call(fetch, '/api.center', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user, authFileList})
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {authFileList: result.data.authFileList} })
      }
    },
    *postAuthUserList({file, authUserList}, {call, put}) {
      let res = yield call(fetch, '/api.center', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({file, authUserList})
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {authUserList: result.data.authUserList} })
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
