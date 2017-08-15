'use strict';
import './style.sass';

import MockedWebSocket from '../mockedWebSocket';
import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducers from './reducers/reducers';
import App from './components/App';
import { setActiveWs } from './actions/uiActions';
import { sendUserIdToServer } from './actions/communicationActions';
import { toggleConfig, setSidebarsVisibleState, usingPhone, selectedScreenType } from './actions/uiActions';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const wsAddresses = [
  'mockedAddress0',
  'mockedAddress1'
];
const wsConnections = {}; // address -> {name, server}/
/* DEV ONLY */
window.wsConnections = wsConnections;
/* DEV ONLY */

function getCookieMap () {
  return document.cookie.split(';')
    .map(kv => kv.trim())
    .map(kv => [kv.slice(0, kv.indexOf('=')), kv.slice(kv.indexOf('=') + 1)])
    .reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});
}

function setupConnection (wsAddress, wsServerName) {
  wsConnections[wsAddress] = {};
  wsConnections[wsAddress].ws = new MockedWebSocket(wsAddress, wsServerName);

  wsConnections[wsAddress].ws.onopen = event => {
    const cookies = getCookieMap();
    const userId = cookies.uid;
    const wsAction = sendUserIdToServer(userId);
    event.target.send(JSON.stringify(wsAction));
  };

  wsConnections[wsAddress].ws.onmessage = event => {
    const wsAction = JSON.parse(event.data);
    wsAction.payload.wsAddress = wsAddress;
    store.dispatch(wsAction);
    if (wsAction.type === 'USER_INFO') {
      const cookies = getCookieMap();
      const userId = cookies.uid;
      if (userId === undefined) {
        document.cookie = 'uid=' + wsAction.payload.userId;
      }
    }
  };

  store.dispatch(setActiveWs(wsAddress));

  wsConnections[wsAddress].ws.mock();
}

function addNewConnection (wsAddress, wsServerName) {
  wsAddresses.push(wsAddress);
  setupConnection(wsAddress, wsServerName);
  const $ml = document.getElementById('messages-list');
  if ($ml) {
    $ml.scrollTop = $ml.scrollHeight;
  }
}

const appMapStateToProps = state => ({
  ui: state.ui,
  connection: state.connection,
  configuration: state.configuration,
  user: state.user
});
const appMapDispatchToProps = dispatch => ({
  changeActiveWsServer: wsAddress => dispatch(setActiveWs(wsAddress)),
  dispatchToggleConfig: () => dispatch(toggleConfig()),
  dispatchCloseSidebars: () => dispatch(setSidebarsVisibleState(false)),
  screenTypeSelected: () => dispatch(selectedScreenType())
});
const AppContainer = connect(appMapStateToProps, appMapDispatchToProps)(App);


function goFullScreen () {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    Reflect.apply(requestFullScreen, docEl, []);
  }
}

function revertFullScreen () {
  const doc = window.document;

  const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen || doc.msExitFullscreen;

  Reflect.apply(cancelFullScreen, doc, []);
}

window.onload = function () {
  const initialWidth = +window.getComputedStyle(document.documentElement).width.slice(0, -2);
  const initialHeight = +window.getComputedStyle(document.documentElement).height.slice(0, -2);
  if (initialWidth < 480) {
    store.dispatch(usingPhone());
    window.scrollTo(0, 1);
  }

  for (let i = 0; i < wsAddresses.length; i++) {
    const address = wsAddresses[i];
    setupConnection(address, 'Demo server ' + i);
  }

  ReactDom.render(
    <Provider store={store}>
      <AppContainer
        initialHeight={initialHeight}
        wsAddresses={wsAddresses}
        wsConnections={wsConnections}
        connectNew={addNewConnection}
        goFullScreen={goFullScreen}
        revertFullScreen={revertFullScreen}/>
    </Provider>,
    document.getElementById('root')
  );
};
