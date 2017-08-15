'use strict';

const defaultConfiguration = {
  sendWithEnter: true,
  changeNameOnlyActive: false
};

export default function configurationReducer (state = defaultConfiguration, action) {
  switch (action.type) {
  case 'CONFIG_SEND_STYLE':
    return Object.assign({}, state, {
      sendWithEnter: action.payload.sendWithEnter
    });
    break;

  case 'CHANGE_NAME_ONLY_ACTIVE':
    return Object.assign({}, state, {
      changeNameOnlyActive: action.payload.boolChangeName
    });
    break;

  default:
    return state;
  }
}
