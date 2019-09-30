import cookie from 'js-cookie'
import { routerRedux } from 'dva/router';
// import fetch from './mock/index'
import fetch from 'dva/fetch'
import {message} from 'antd'
import Config from '../config'
const {getURL} = Config
export default {
  namespace: 'entry',
  state: {
    mode: 0
  },
  effects: {
    *login ({payload}, {put, call}) {
      yield put({ type: 'save',
          payload: {mode: 0}
        })
      let res = yield call(fetch, getURL('login'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      let result = yield res.json()
      if (result.success) {
        cookie.set('token', result.data.token, {expires: result.data.expires || 1})
        cookie.set('isManager', result.data.isManager, {expires: result.data.expires || 1})
        cookie.set('username', payload.username || 'user')
        yield put(routerRedux.push('/'))
        message.success('login success')
      } else {
        message.error('[Login fail] ' + result.data)
      }
    },
    *register ({payload}, {put, call}) {
      let res = yield call(fetch, getURL('register'), {
        method: 'POST',
        credentials: 'include',
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
        message.success('register success, please login.')
      } else {
        message.error('[Register fail] ' + result.data)
      }
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
}