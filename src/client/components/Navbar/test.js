'use strict';
/* global jest, describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './index';

const dispatchToggleConfig = jest.fn();
const component = shallow(<Navbar dispatchToggleConfig={dispatchToggleConfig}/>);
describe('The Navbar component', () => {
  it('should render the Navbar', () => {
    expect(component.find('.navbar').length).toBe(1);
  });

  it('should render the information from the user', () => {
    expect(false).toBe(true);
  });

  it('should render a search bar', () => {
    expect(false).toBe(true);
  });

  it('should show the name of the room/server', () => {
    expect(component.find('.server-name').length).toBe(1);
  });

  it('should have a button to toggle "configuration" visibility', () => {
    expect(component.find('#toggle-config').length).toBe(1);
  });

  describe('\'s configuration toggle button', () => {
    it('should\'t call it\'s property `dispatchToggleConfig` before clicking the button', () => {
      expect(dispatchToggleConfig.mock.calls.length).toBe(0);
    });

    it('should call it\'s property `dispatchToggleConfig` when clicking the button', () => {
      component.find('#toggle-config').simulate('click');
      expect(dispatchToggleConfig.mock.calls.length).toBe(1);
    });
  });
});
