'use strict';

export function addMessageHistory (rawMessage) {
  return ({
    type: 'ADD_MSG_HISTORY',
    payload: {
      rawMessage
    }
  });
}
