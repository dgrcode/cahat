'use strict';

/*
  state: {
    ...
    wsAddress_i: {
      serverName: String
      isConnected: Boolean
      userNames: {
        ...
        userId_i: userName_i,
        ...
      }
    }
    ...
  }
*/

export default function connectionReducer (state = {}, action) {
  switch (action.type) {
  case 'HANDSHAKE':
    return Object.assign({}, state, {
      [action.payload.wsAddress]: {
        serverName: action.payload.serverName,
        isConnected: true,
        userNames: action.payload.userNames
      }
    });
    break;

  case 'NAME_CHANGE':
    const updatedState = Object.assign({}, state);
    updatedState[action.payload.wsAddress].userNames[action.payload.userId] = action.payload.name;
    return updatedState;

  default:
    return state;
  }
}
