'use strict';

const defaultUi = {
  visibleConfig: false,
  visibleMenu: false,
  activeWsAddress: null,
  usingPhone: false,
  selectedScreenType: false
};

export default function configurationReducer (state = defaultUi, action) {
  switch (action.type) {
  case 'TOGGLE_CONFIG':
    return Object.assign({}, state, {
      visibleConfig: !state.visibleConfig
    });
    break;

  case 'SET_CONFIG_STATE':
    return Object.assign({}, state, {
      visibleConfig: action.payload.isVisible
    });
    break;

  case 'TOGGLE_MENU':
    return Object.assign({}, state, {
      visibleMenu: !state.visibleMenu
    });
    break;

  case 'SET_MENU_STATE':
    return Object.assign({}, state, {
      visibleMenu: action.payload.isVisible
    });
    break;

  case 'SET_SIDEBARS_STATE':
    return Object.assign({}, state, {
      visibleMenu: action.payload.isVisible,
      visibleConfig: action.payload.isVisible
    });
    break;

  case 'SET_ACTIVE_WS':
    return Object.assign({}, state, {
      activeWsAddress: action.payload.wsAddress
    });
    break;

  case 'USING_PHONE':
    return Object.assign({}, state, {
      usingPhone: true
    });
    break;

  case 'SELECTED_SCREEN_TYPE':
    return Object.assign({}, state, {
      selectedScreenType: true
    });
    break;

  default:
    return state;
  }
}
