'use strict';

export const toggleConfig = () => ({
  type: 'TOGGLE_CONFIG'
});

export const setConfigVisibleState = isVisible => ({
  type: 'SET_CONFIG_STATE',
  payload: {
    isVisible
  }
});

export const toggleMenu = () => ({
  type: 'TOGGLE_MENU'
});

export const setMenuVisibleState = isVisible => ({
  type: 'SET_MENU_STATE',
  payload: {
    isVisible
  }
});

export const setSidebarsVisibleState = isVisible => ({
  type: 'SET_SIDEBARS_STATE',
  payload: {
    isVisible
  }
});

export const setActiveWs = wsAddress => ({
  type: 'SET_ACTIVE_WS',
  payload: {
    wsAddress
  }
});

export const usingPhone = () => ({
  type: 'USING_PHONE'
});

export const selectedScreenType = () => ({
  type: 'SELECTED_SCREEN_TYPE'
});
