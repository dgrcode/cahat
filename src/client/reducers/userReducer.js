'use strict';

const defaultUser = {
  id: undefined
};

export default function configurationReducer (state = defaultUser, action) {
  switch (action.type) {
  case 'USER_INFO':
    return Object.assign({}, state, {
      id: action.payload.userId,
      name: Object.assign({}, state.name, {
        [action.payload.wsAddress]: action.payload.name
      })
    });
    break;

  case 'NAME_CHANGE':
    if (!state.id || action.payload.userId !== state.id) return state;
    return Object.assign({}, state, {
      name: Object.assign({}, state.name, {
        [action.payload.wsAddress]: action.payload.name
      })
    });
    break;

  default:
    return state;
  }
}
