'use strict';

let modifiedState;
let wsAddress;
let currentMessages;
const messageSorter = (a, b) => {
  if (a.timestamp === b.timestamp) return 0;
  if (a.timestamp - b.timestamp < 0) return -1;
  return 1;
};

export default function messageReducer (state = {}, action) {
  switch (action.type) {
  case 'MESSAGE':
    wsAddress = action.payload.wsAddress;
    const newMessage = {
      htmlMessage: action.payload.htmlMessage,
      rawMessage: action.payload.rawMessage,
      userId: action.payload.userId,
      timestamp: action.payload.timestamp
    };
    modifiedState = {};
    currentMessages = state[wsAddress] || [];
    modifiedState[wsAddress] = [...currentMessages.splice(-100), newMessage]
        .sort(messageSorter);
    return Object.assign({}, state, modifiedState);
    break;

  case 'HANDSHAKE':
    wsAddress = action.payload.wsAddress;
    const newMessageGroup = action.payload.messages.map(v => ({
      htmlMessage: v.htmlMessage,
      rawMessage: v.rawMessage,
      userId: v.userId,
      timestamp: v.timestamp
    }));
    modifiedState = {};
    currentMessages = state[wsAddress] || [];
    modifiedState[wsAddress] = [...currentMessages.splice(-100), ...newMessageGroup]
        .sort(messageSorter);
    return Object.assign({}, state, modifiedState);


  default:
    return state;
  }
}
