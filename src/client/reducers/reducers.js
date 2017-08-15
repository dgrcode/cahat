'use strict';

import messageReducer from './messageReducer';
import configurationReducer from './configurationReducer';
import messageHistoryReducer from './messageHistoryReducer';
import uiReducer from './uiReducer';
import userReducer from './userReducer';
import connectionReducer from './connectionReducer';

export default function reducers (state = {}, action) {
  return {
    messages: messageReducer(state.messages, action),
    messageHistory: messageHistoryReducer(state.messageHistory, action),
    configuration: configurationReducer(state.configuration, action),
    ui: uiReducer(state.ui, action),
    user: userReducer(state.user, action),
    connection: connectionReducer(state.connection, action)
  };
}
