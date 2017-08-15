'use strict';

export function createMessageAction (rawMessage, userId) {
  return ({
    type: 'MESSAGE',
    payload: {
      rawMessage,
      userId
    }
  });
}
