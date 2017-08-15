'use strict';
/* global describe, it, expect */

import React from 'react';
import { mount } from 'enzyme';
import MessageView from './index';

/*
  isFromUser: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  messageTime: PropTypes.instanceOf(Date).isRequired,
  children: PropTypes.string.isRequired
*/

const dummyMsg = {
  rawMessage: 'whatever',
  htmlMessage: '<p>whatever,</p>',
  userId: 0,
  timestamp: new Date()
};
const userName = 'Peter';
const component = mount(
  <MessageView
    isFromUser={false}
    userName={userName}
    messageTime={dummyMsg.timestamp}
    >{dummyMsg.htmlMessage}</MessageView>
);
describe('The MessageView', () => {
  it('should render a message', () => {
    expect(component.find('.message').length).toBe(1);
  });

  it('should show a `from-user` element when passed `isFromUser=true`', () => {
    component.setProps({ isFromUser: true });
    expect(component.find('.message').length).toBe(1);
    expect(component.find('.from-user').length).toBe(1);
  });

  it('should not show a `from-user` element when passed `isFromUser=false`', () => {
    component.setProps({ isFromUser: false });
    expect(component.find('.message').length).toBe(1);
    expect(component.find('.from-user').length).toBe(0);
  });
});
