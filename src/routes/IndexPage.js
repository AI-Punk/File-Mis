import React from 'react';
import { connect } from 'dva';
import HomePage from '../pages/home/index.js'

function IndexPage(props) {
  console.log(props)
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
