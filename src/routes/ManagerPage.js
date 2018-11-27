import React from 'react';
import { connect } from 'dva';
import ManagerPage from '../pages/manager/index.js'

function IndexPage(props) {
  console.log(props)
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
