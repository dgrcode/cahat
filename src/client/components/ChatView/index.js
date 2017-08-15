'use strict';
import './style.sass';

import React from 'react';
import PropTypes from 'prop-types';
import MessagesListViewContainer from '../../containers/MessagesListViewContainer';
import WritingBoxView from '../WritingBoxView';
import Footer from '../Footer';
import { createMessageAction } from '../../actions/messageActions';

export default class ChatView extends React.Component {
  static propTypes = {
    ws: PropTypes.object,
    // TODO define if ownerId will be a string or a number
    user: PropTypes.object.isRequired,
    sendWithEnter: PropTypes.bool.isRequired,
    messageHistory: PropTypes.array.isRequired,
    dispatchMessageToHistory: PropTypes.func.isRequired
  }

  handleSend = (message) => {
    if (message === '') return;
    const ws = this.props.ws;
    const userId = this.props.user.id;
    const messageAction = createMessageAction(message, userId);
    this.props.dispatchMessageToHistory(message);
    ws.send(JSON.stringify(messageAction));
  }

  render () {
    return (
      <div className="chat">
        <MessagesListViewContainer/>
        <WritingBoxView
          handleSend={this.handleSend}
          messageHistory={this.props.messageHistory}
          sendWithEnter={this.props.sendWithEnter}/>
        <Footer/>
      </div>
    );
  }
}
