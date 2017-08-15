'use strict';
/* global jest, describe, it, expect */

import React from 'react';
import { mount } from 'enzyme';
import WritingBoxView from './index';

const handleSend = jest.fn();
const cfgSendMessageWithEnter = true;
const component = mount(
  <WritingBoxView handleSend={handleSend} sendWithEnter={cfgSendMessageWithEnter} messageHistory={[]}/>
);
describe('The WrittingBoxView', () => {
  it('should render the Writting Box', () => {
    expect(component.find('.writing-box').length).toBe(1);
  });

  it('should have 1 textarea', () => {
    expect(component.find('textarea').length).toBe(1);
  });

  it('should have 1 sending button', () => {
    expect(component.find('button').length).toBe(1);
    expect(component.find('button').text()).toBe('Send');
  });

  const dummyMessage = 'test message';
  it('textarea child should reflect the component state', () => {
    component.setState({ message: dummyMessage });
    expect(component.find('textarea').text()).toBe(dummyMessage);
  });

  it('send message on clicking the Send button', () => {
    component.setState({ message: dummyMessage });
    component.find('button').simulate('click');
    const argsCall = handleSend.mock.calls[0];
    expect(argsCall).toEqual([dummyMessage]);
    expect(component.find('textarea').text()).toBe('');
  });

  it('reset the state when sending a message', () => {
    component.setState({ message: dummyMessage });
    component.find('button').simulate('click');
    expect(component.state().message).toBe('');
  });
});
