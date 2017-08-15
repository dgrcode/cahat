'use strict';

import { connect } from 'react-redux';
import MessagesListView from '../components/MessagesListView';

function mapStateToProps (state) {
  return ({
    activeWsAddress: state.ui.activeWsAddress,
    messages: state.messages[state.ui.activeWsAddress] || [],
    connection: state.connection,
    user: state.user
  });
}

const MessagesListViewContainer = connect(
  mapStateToProps
)(MessagesListView);

export default MessagesListViewContainer;
