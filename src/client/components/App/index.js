'use strict';
import './style.sass';

import React from 'react';
import PropTypes from 'prop-types';
import NavbarContainer from '../../containers/NavbarContainer';
import MenuView from '../MenuView';
import SettingsIcon from '../SettingsIcon';
import ConfigurationViewContainer from '../../containers/ConfigurationViewContainer';
import ChatViewContainer from '../../containers/ChatViewContainer';
import FullScreenBanner from '../FullScreenBanner';
import { nameChangeAction } from '../../actions/configurationActions';

export default class App extends React.Component {
  static propTypes = {
    initialHeight: PropTypes.number.isRequired,
    wsAddresses: PropTypes.array.isRequired,
    wsConnections: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    configuration: PropTypes.object.isRequired,
    connection: PropTypes.object.isRequired,
    changeActiveWsServer: PropTypes.func.isRequired,
    dispatchToggleConfig: PropTypes.func.isRequired,
    dispatchCloseSidebars: PropTypes.func.isRequired,
    connectNew: PropTypes.func.isRequired,
    goFullScreen: PropTypes.func.isRequired,
    revertFullScreen: PropTypes.func.isRequired,
    screenTypeSelected: PropTypes.func.isRequired
  }

  componentDidMount () {
    const $menuWrapper = document.getElementById('menu-wrapper');
    const $secondaryContent = document.getElementById('secondary-content');
    const outOfFoucsClickListenerCurry = target => evt => {
      if (evt.target === target) {
        this.props.dispatchCloseSidebars();
      }
    };
    $secondaryContent.addEventListener('click', outOfFoucsClickListenerCurry($secondaryContent));
    $menuWrapper.addEventListener('click', outOfFoucsClickListenerCurry($menuWrapper));

    //document.getElementById('container').style.height = this.props.initialHeight + 'px';
    //document.getElementById('menu').style.height = this.props.initialHeight + 'px';
    //document.getElementById('layout').style.minHeight = this.props.initialHeight + 'px';
  }

  changeActiveWsServer = wsAddress => {
    this.props.changeActiveWsServer(wsAddress);
  }

  handleConnectNew = (wsAddress) => {
    // TODO check if the ws address is valid and refuse to connect if that's the case
    this.props.connectNew(wsAddress);
    this.forceUpdate();
  }

  changeName = (name) => {
    if (this.props.configuration.changeNameOnlyActive) {
      this.props.wsConnections[this.props.ui.activeWsAddress].ws.send(
        JSON.stringify(nameChangeAction(name, this.props.user.id))
      );
    } else {
      for (let wsAddress in this.props.wsConnections) {
        this.props.wsConnections[wsAddress].ws.send(
          JSON.stringify(nameChangeAction(name, this.props.user.id))
        );
      }
    }
  }

  render () {
    const visibleConfig = this.props.ui.visibleConfig;
    const visibleMenu = this.props.ui.visibleMenu;
    const activeWsAddress = this.props.ui.activeWsAddress;
    const ws = activeWsAddress ? this.props.wsConnections[this.props.ui.activeWsAddress].ws : undefined;
    const wsNames = this.props.wsAddresses
      .map(wsAddress => ({
        address: wsAddress,
        name: this.props.connection[wsAddress] ? this.props.connection[wsAddress].serverName : '...'
      }));
    return (
      <div className="layout" id="layout">
      <NavbarContainer/>
        <div className="content">
          <div className="main-content">
            <div id="menu-wrapper" className={`menu-wrapper ${visibleMenu ? 'visible' : 'hidden'}`}>
              <MenuView
                wsNames={wsNames}
                changeActiveWsServer={this.changeActiveWsServer}
                dispatchToggleConfig={this.props.dispatchToggleConfig}
                dispatchCloseSidebars={this.props.dispatchCloseSidebars}/>
            </div>
            <ChatViewContainer
              ws={ws}
              user={this.props.user}/>
          </div>
          <div id="secondary-content" className={`secondary-content ${visibleConfig ? 'visible' : 'hidden'}`}>
            <SettingsIcon phoneHidden visibleConfig={visibleConfig} onClick={this.props.dispatchToggleConfig}/>
            <ConfigurationViewContainer id="configuration"
              connectNew={this.handleConnectNew}
              changeName={this.changeName}/>
          </div>
        </div>
      </div>
    );
  }
}
