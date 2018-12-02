import fetch from './mock/index'
export default {

  namespace: 'home',

  state: {
    currentFile: 0,
    currentWindow: 0,
    fileInfo: {},
    fileList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *getFileList ({payload}, {call, put}) {
      let res = yield call(fetch, '//api.center/getFileList', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      let result = yield res.json()
      if (result.success) {
        put({
          type: 'save',
          payload: {
            fileList: result.data
          }
        })
      }
    },
    *getFile ({payload}, {call, put}) {
      let res = yield call(fetch, '//api.center/getFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      let result = yield res.json()
      if (result.success) {
        put({
          type: 'save',
          fileInfo: result.data
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
    }
  },

};
