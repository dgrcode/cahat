'use strict';
import './style.sass';

import React from 'react';
import PropTypes from 'prop-types';
import settingsSvg from '../../assets/settingsSvg';

const SettingsIcon = (props) => (
  <div onClick={props.onClick} role="button"
    className={`
      settings-button
      ${props.visibleConfig ? 'configuration-open' : ''}
      ${props.phoneHidden ? 'phone-hidden' : ''}
    `}>
    {settingsSvg}
  </div>
);

SettingsIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  visibleConfig: PropTypes.bool,
  phoneHidden: PropTypes.bool
};

export default SettingsIcon;
