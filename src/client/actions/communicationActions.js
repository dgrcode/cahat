'use strict';

export function sendUserIdToServer (userId) {
  return ({
    type: 'HANDSHAKE_USER_INFO',
    payload: {
      userId
    }
  });
}
