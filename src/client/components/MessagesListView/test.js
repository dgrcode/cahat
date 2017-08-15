'use strict';
/* global describe, it, expect */

import React from 'react';
import { mount } from 'enzyme';
import MessagesListView from './index';

/*
  messages: PropTypes.array.isRequired,
  userId: PropTypes.number.isRequired,
  userIdNames: PropTypes.object.isRequired
*/

const dummyUserId = 0;
const userIdNames = {
  0: 'Dani',
  1: 'Laura',
  2: 'Peter'
};
const component = mount(
  <MessagesListView
    messages={[]}
    userId={dummyUserId}
    userIdNames={userIdNames}/>
);
const msg = (message, userId) => ({
  rawMessage: message,
  htmlMessage: `<p>${message}</p>`,
  userId: userId,
  timestamp: new Date()
});
const dummyMessages = [
  msg('a', 0), msg('b', 1), msg('c', 2), msg('d', 0), msg('e', 1), msg('f', 2)
];
describe('The MessagesListView', () => {
  it('should render the Messages List', () => {
    expect(component.find('.messages-list').length).toBe(1);
  });

  it('should show a .message element for each message in the props', () => {
    component.setProps({ messages: dummyMessages });
    expect(component.find('.message').length).toBe(dummyMessages.length);
  });

  it('should give class `from-user` to the messages sent by the user', () => {
    component.setProps({ messages: dummyMessages });
    expect(component.find('.from-user').length)
      .toBe(dummyMessages.filter(msg => msg.userId === dummyUserId).length);
  });
});
