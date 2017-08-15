'use strict';

import { connect } from 'react-redux';
import ChatView from '../components/ChatView';
import { addMessageHistory } from '../actions/messageHistoryActions';

function mapStateToProps (state) {
  return ({
    sendWithEnter: state.configuration.sendWithEnter,
    messageHistory: state.messageHistory
  });
}

function mapDispatchToProps (dispatch) {
  return ({
    dispatchMessageToHistory: (msg) => {
      dispatch(addMessageHistory(msg));
    }
  });
}

const ChatViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatView);

export default ChatViewContainer;
