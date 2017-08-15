'use strict';
/* global jest, describe, it, expect */
import '../../../../test/dummyWebSocketInjector';

import React from 'react';
import { mount } from 'enzyme';
import ConfigurationView from './index';

const dummyConfig = {
  sendWithEnter: false
};
const onChangeSendStyle = jest.fn();
const mockIsVisible = true;

const component = mount(
  <ConfigurationView
    configuration={dummyConfig}
    isVisible={mockIsVisible}
    onChangeSendStyle={onChangeSendStyle}/>
);

describe('The ConfigurationView component', () => {
  it('renders itself', () => {
    expect(component.find('.configuration').length).toBe(1);
  });
});
