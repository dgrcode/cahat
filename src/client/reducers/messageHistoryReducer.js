'use strict';

export default function messageReducer (state = [], action) {
  switch (action.type) {
  case 'ADD_MSG_HISTORY':
    return [action.payload.rawMessage, ...state.splice(-100)];
    break;

  default:
    return state;
  }
}
