'use strict';
import './style.sass';

import React from 'react';
import PropTypes from 'prop-types';

export default class FullScreenBanner extends React.PureComponent {
  static propTypes = {
    showFullScreenBanner: PropTypes.bool.isRequired,
    goFullScreen: PropTypes.func.isRequired,
    revertFullScreen: PropTypes.func.isRequired,
    screenTypeSelected: PropTypes.func.isRequired
  };

  handleGoFullScreen = () => {
    console.log('click!');
    this.props.goFullScreen();
    this.props.screenTypeSelected();
  }

  handleCancelFullScreen = () => {
    this.props.revertFullScreen();
    this.props.screenTypeSelected();
  }

  render () {
    if (!this.props.showFullScreenBanner) return null;
    return (
      <div id="fullscreen-banner">
        <button className="button-fullscreen" onClick={this.handleGoFullScreen}>Go full screen</button>
        <button className="button-cancel" onClick={this.handleCancelFullScreen}>Cancel</button>
      </div>
    );
  }
}
