'use strict';
/* global jest, describe, it, expect */
import '../../../../test/dummyWebSocketInjector';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../reducers/reducers';
import { createMessageAction } from '../../actions/messageActions';
import { mount } from 'enzyme';
import ChatView from './index';
import WebSocket from '../../../../test/dummyWebSocket';
import mockServerMessageHandler from '../../../../test/mockServerMessageHandler';

/*
  ws: PropTypes.instanceOf(WebSocket).isRequired,
  userId: PropTypes.number.isRequired,
  userIdNames: PropTypes.object.isRequired,
  sendWithEnter: PropTypes.bool.isRequired,
  messageHistory: PropTypes.array.isRequired,
  dispatchMessageToHistory: PropTypes.func.isRequired
*/

const store = createStore(reducers);
const ws = new WebSocket();
const dummyUserId = 0;
const userIdNames = {
  0: 'Dani',
  1: 'Laura',
  2: 'Peter'
};
const dispatchMessageToHistory = jest.fn();
const cfgSendMessageWithEnter = true;
const component = mount(
  <Provider store={store}>
    <ChatView
      ws={ws}
      userId={dummyUserId}
      userIdNames={userIdNames}
      sendWithEnter={cfgSendMessageWithEnter}
      messageHistory={[]}
      dispatchMessageToHistory={dispatchMessageToHistory}/>
  </Provider>
  );
const dummyMessageActions = [
  createMessageAction('a', 0),
  createMessageAction('b', 1),
  createMessageAction('c', 2),
  createMessageAction('d', 0),
  createMessageAction('e', 1),
  createMessageAction('f', 2)
];

describe('The ChatView component', () => {
  it('renders itself', () => {
    expect(component.find('.chat').length).toBe(1);
  });

  describe('should initialize with an empty list of messages and the writing box', () => {
    it('has one messages list component', () => {
      expect(component.find('.messages-list').length).toBe(1);
    });
    it('has one writing box component', () => {
      expect(component.find('.writing-box').length).toBe(1);
    });
    it('doesn\'t have any message', () => {
      expect(component.find('.message').length).toBe(0);
    });
  });


  it('should render as many messages as there are in the state', () => {
    dummyMessageActions
    .map(msgAction => mockServerMessageHandler(msgAction))
    .map(wsActionAnswer => store.dispatch(wsActionAnswer));
    expect(component.find('.message').length).toBe(dummyMessageActions.length);
  });
});
