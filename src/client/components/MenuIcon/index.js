'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import menuSvg from '../../assets/menuSvg';

const MenuIcon = (props) => (
  <div onClick={props.onClick} role="button"
    className="menu-button">
    {menuSvg}
  </div>
);

MenuIcon.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default MenuIcon;
