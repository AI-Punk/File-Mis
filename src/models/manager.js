// import fetch from 'dva/fetch'
import fetch from './mock/index'
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
      let res = yield call(fetch, '//api.center/postFile', {
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
      let res = yield call(fetch, '//api.center/postUser', {
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
      let res = yield call(fetch, '//api.center/getFileList', {
        method: 'get'
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {fileList: result.data} })
      }
    },
    *getUserList(action, {call, put}) {
      let res = yield call(fetch, '//api.center/getUserList', {
        method: 'get'
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {userList: result.data} })
      }
    },
    *getAuthFileList({user}, {call, put}) {
      let res = yield call(fetch, '//api.center/getAuthFileList', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {authFileList: result.data} })
      }
    },
    *getAuthUserList({file}, {call, put}) {
      let res = yield call(fetch, '//api.center/getAuthUserList', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({file})
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {authUserList: result.data} })
      }
    },
    *postAuthFileList({user, authFileList}, {call, put}) {
      let res = yield call(fetch, '//api.center/postAuthFileList', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user, authFileList})
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {authFileList: result.data} })
      }
    },
    *postAuthUserList({file, authUserList}, {call, put}) {
      let res = yield call(fetch, '//api.center/postAuthUserList', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({file, authUserList})
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save', payload: {authUserList: result.data} })
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
