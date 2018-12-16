import React from 'react';
import { connect } from 'dva';
import ManagerPage from '../pages/manager/index.js'
import {cookie} from 'cookie_js'
import {routerRedux} from 'dva/router'

function IndexPage(props) {
  console.log('cookie', typeof cookie.get('token'))
  if (typeof cookie.get('token') === 'undefined') {
    props.dispatch(routerRedux.push('/entry'))
  }
  return (
    <ManagerPage {...props} />
  );
}
function mapStateToProps (state) {
  // console.log(state, 'state')
  return state.manager
}
IndexPage.propTypes = {
};

export default connect(mapStateToProps)(IndexPage);
