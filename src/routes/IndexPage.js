import React from 'react';
import { connect } from 'dva';
import HomePage from '../pages/home/index.js'
import cookie from 'cookie_js'
import {routerRedux} from 'dva/router'

function IndexPage(props) {
  if (typeof cookie.get('token') === 'undefined') {
    props.dispatch(routerRedux.push('/entry'))
  }
  return (
    <HomePage {...props} />
  );
}
function mapStateToProps (state) {
  // console.log(state, 'state')
  return state.home
}
IndexPage.propTypes = {
};

export default connect(mapStateToProps)(IndexPage);
