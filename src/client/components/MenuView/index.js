'use strict';
import './style.sass';

import React from 'react';
import PropTypes from 'prop-types';

export default class MenuView extends React.Component {
  static propTypes = {
    wsNames: PropTypes.array.isRequired,
    changeActiveWsServer: PropTypes.func.isRequired,
    dispatchToggleConfig: PropTypes.func.isRequired,
    dispatchCloseSidebars: PropTypes.func.isRequired
  }

  handleClick (idx) {
    // TODO actually wsNames will have to be another thing. Probably the whole
    // connection object.
    this.props.dispatchCloseSidebars();
    this.props.changeActiveWsServer(this.props.wsNames[idx].address);
  }

  render () {
    return (
      <div className="menu" id="menu">
        <img id="logo" src="logocat.png"/>
        {
          this.props.wsNames.map((wsInfo, idx) =>
          (<div className="ws-info" key={idx} onClick={this.handleClick.bind(this, idx)}>
            <div className="ws-name">
                {wsInfo.name}
            </div>
            <em className="ws-address">{wsInfo.address}</em>
          </div>)
          )
        }
        <button className="button-add-server" onClick={this.props.dispatchToggleConfig}>Add</button>
      </div>
    );
  }
}
