'use strict';
import './style.sass';

import React from 'react';
import PropTypes from 'prop-types';

export default class MessageView extends React.Component {
  static propTypes = {
    isFromUser: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    messageTime: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.string.isRequired
  }

  render () {
    const msgTime = this.props.messageTime;
    return (
      <div
        className={`message ${this.props.isFromUser ? 'from-user' : 'from-another'}`}>
        <div className="message-info">
          {this.props.isFromUser ? null : <span className="message-owner">{this.props.userName} - </span>}
          <span className="message-time">
            {('0' + msgTime.getHours()).slice(-2)}:{('0' + msgTime.getMinutes()).slice(-2)}</span>
        </div>
        <div className="message-content"
          dangerouslySetInnerHTML={{ __html: this.props.children }}/>
      </div>
    );
  }
}
