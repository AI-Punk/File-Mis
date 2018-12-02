import React from 'react';
import { connect } from 'dva';
import EntryPage from '../pages/entry/index.js'

function IndexPage(props) {
  return (
    <EntryPage {...props} />
  );
}

function mapStateToProps (state) {
  return state.entry
}
export default connect(mapStateToProps)(IndexPage)
