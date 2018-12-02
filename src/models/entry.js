import {cookie} from 'cookie_js'
import { routerRedux } from 'dva/router';
import fetch from './mock/index'
export default {
  namespace: 'entry',
  state: {
    mode: 0
  },
  effects: {
    *login ({payload}, {put, call}) {
      let res = yield call(fetch, '//api.center/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      let result = yield res.json()
      if (result.success) {
        cookie.set('token', result.data)
        yield put(routerRedux.push('/manager'))
      }
    },
    *register ({payload}, {put, call}) {
      let res = yield call(fetch, '//api.center/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      let result = yield res.json()
      if (result.success) {
        yield put({ type: 'save',
          payload: {mode: 0}
        })
      }
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
}