'use strict';
import './style.sass';

import React from 'react';
import PropTypes from 'prop-types';
import SettingsIcon from '../SettingsIcon';
import MenuIcon from '../MenuIcon';

export default class Navbar extends React.Component {
  static propTypes = {
    dispatchToggleConfig: PropTypes.func.isRequired,
    dispatchToggleMenu: PropTypes.func.isRequired,
    dispatchCloseConfig: PropTypes.func.isRequired,
    dispatchCloseMenu: PropTypes.func.isRequired,
    connection: PropTypes.object.isRequired,
    activeWsAddress: PropTypes.string
  }

  handleOpenMenu = () => {
    this.props.dispatchToggleMenu();
    this.props.dispatchCloseConfig();
  }

  handleOpenConfig = () => {
    this.props.dispatchToggleConfig();
    this.props.dispatchCloseMenu();
  }

  render () {
    const activeWsAddress = this.props.activeWsAddress;
    const connection = this.props.connection;

    return (
      <div className="navbar" id="navbar">
        <MenuIcon onClick={this.handleOpenMenu}/>
        <div className="server-name">
          {activeWsAddress && connection[activeWsAddress] ? connection[activeWsAddress].serverName : 'Not connected'}
        </div>
        <SettingsIcon onClick={this.handleOpenConfig}/>
      </div>
    );
  }
}
