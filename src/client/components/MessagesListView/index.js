'use strict';
import './style.sass';

import React from 'react';
import PropTypes from 'prop-types';

import MessageView from '../MessageView';
import DateSeparator from '../DateSeparator';

export default class MessagesListView extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    // TODO define if ownerId will be a string or a number
    user: PropTypes.object.isRequired,
    connection: PropTypes.object.isRequired,
    activeWsAddress: PropTypes.string
  }

  constructor (props) {
    super(props);
    this.state = {
      stickyDateIdx: 0,
      stickyDate: ''
    };
  }

  componentDidMount () {
    this.handleScroll();
  }

  componentWillUpdate () {
    const isScrolledToBottom = this.list.scrollHeight - this.list.clientHeight < this.list.scrollTop + 3;
    if (isScrolledToBottom) {
      this.moveDownAfterUpdate = true;
    } else {
      this.moveDownAfterUpdate = false;
    }
  }

  componentDidUpdate () {
    if (this.moveDownAfterUpdate) {
      this.list.scrollTop = this.list.scrollHeight - this.list.clientHeight;
    }
  }

  handleScroll = () => {
    const $sticky = document.getElementsByClassName('sticky')[0];
    if (!$sticky) return;
    const sIdx = this.state.stickyDateIdx;
    const separators = Array.from(document.getElementsByClassName('date-separator')).slice(1);

    const $navbar = document.getElementById('navbar');
    const navbarSize = $navbar.getBoundingClientRect().bottom;
    const stickyHeight = $sticky.getBoundingClientRect().height;

    const sepTops = separators.map(s => s.getBoundingClientRect().top - navbarSize);

    if (sepTops[sIdx + 1] <= stickyHeight) {
      $sticky.style.top = sepTops[sIdx + 1] - stickyHeight + "px";
    } else {
      $sticky.style.top = 0 + "px";
    }

    if (sepTops[sIdx] > 0 && sIdx !== 0) {
      this.setState({
        stickyDateIdx: sIdx - 1,
        stickyDate: separators[sIdx - 1].getElementsByClassName('date')[0].outerText
      });
    } else if (sIdx < sepTops.length - 1 && sepTops[sIdx + 1] <= 0) {
      this.setState({
        stickyDateIdx: sIdx + 1,
        stickyDate: separators[sIdx + 1].getElementsByClassName('date')[0].outerText
      });
    }
  }

  renderMessages = () => {
    let lastFullDate = 0;
    const content = [];
    let separatorIdx = 0;
    for (let idx = 0; idx < this.props.messages.length; idx++) {
      const msg = this.props.messages[idx];
      const msgFullDate = (new Date(msg.timestamp)).toLocaleDateString();
      if (msgFullDate !== lastFullDate) {
        lastFullDate = msgFullDate;
        content.push(
          <DateSeparator date={msgFullDate} key={`separator${separatorIdx++}`}/>
        );
      }

      const msgUserName = this.props.connection[this.props.activeWsAddress].userNames[msg.userId] || 'Anonymous';
      content.push(
        <MessageView
          key={idx}
          userName={msgUserName}
          messageTime={new Date(msg.timestamp)}
          isFromUser={this.props.user.id === msg.userId}>
            {msg.htmlMessage}
        </MessageView>
      );
    }

    return content;
  }

  render () {
    // TODO UGLY
    return (
      <div className="messages-list" id="messages-list" onScroll={this.handleScroll}
        ref={list => {this.list = list;}}>
        {this.props.activeWsAddress ? null : <div className="feedback no-ws">Connect to a WebSocket to start using the app</div>}
        {this.props.activeWsAddress ? <DateSeparator sticky date={this.state.stickyDate}/> : null}
        {this.props.activeWsAddress ? this.renderMessages() : null}
      </div>
    );
  }
}
