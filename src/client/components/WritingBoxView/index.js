'use strict';
import './style.sass';

import React from 'react';
import PropTypes from 'prop-types';

export default class WritingBoxView extends React.Component {
  static propTypes = {
    handleSend: PropTypes.func.isRequired,
    sendWithEnter: PropTypes.bool.isRequired,
    messageHistory: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      message: '',
      messageHistoryIdx: null
    };
  }

  componentDidMount = () => {
    document.onkeydown = (e) => {
      // 13 ENTER
      // 17 CTRL
      // 38 UP
      // 40 DOWN
      if (e.keyCode === 17) {
        this.ctrl = true;
      }
      if ((this.ctrl && e.keyCode === 13) ||
          (this.props.sendWithEnter && e.keyCode === 13)) {
        this.handleClick();
        e.preventDefault();
      }
      const msg = this.state.message;
      const msgHistory = this.props.messageHistory;
      let msgHistoryIdx = this.state.messageHistoryIdx;
      if (e.keyCode === 38 && msgHistoryIdx < msgHistory.length - 1 &&
          (msg === '' || msg === msgHistory[msgHistoryIdx])) {
        if (msgHistoryIdx === null) {
          msgHistoryIdx = -1;
        }
        msgHistoryIdx++;
        this.setState({
          message: msgHistory[msgHistoryIdx],
          messageHistoryIdx: msgHistoryIdx
        });
      }
      if (e.keyCode === 40 && msgHistoryIdx !== null &&
          (msg === '' || msg === msgHistory[msgHistoryIdx])) {
        if (msgHistoryIdx === 0) {
          msgHistoryIdx = null;
          this.setState({
            message: '',
            messageHistoryIdx: msgHistoryIdx
          });
        } else {
          msgHistoryIdx--;
          this.setState({
            message: msgHistory[msgHistoryIdx],
            messageHistoryIdx: msgHistoryIdx
          });
        }
      }
    };
    document.onkeyup = (e) => {
      if (e.keyCode === 17) {
        this.ctrl = false;
      }
    };

    /*
    const $mwb = document.getElementById('message-writing-box');
    $mwb.addEventListener('focus', () => {
      console.log('focusEvent');
      window.location.href = '#message-writing-box';
    }, true);
    $mwb.addEventListener('blur', () => {
      console.log('blurEvent');
      window.location.href = "#";
    }, true);
    */
  }

  componentWillUnmount () {
    document.onkeydown = undefined;
    document.onkeyup = undefined;
  }

  handleChange = (event) => {
    /*
    check the amount of lines:
    https://stackoverflow.com/questions/2035910/how-to-get-the-number-of-lines-in-a-textarea

    $(document).ready(function(){
      var lht = parseInt($('textarea').css('lineHeight'),10);
      var lines = $('textarea').attr('scrollHeight') / lht;
      console.log(lines);
    })
    */
    this.setState({ message: event.target.value });
  }

  handleClick = () => {
    this.props.handleSend(this.state.message);
    this.setState({ message: '' });
  }

  /*
  handleFocus () {
    alert(window.location);
    window.location.href = '#message-writing-box';
    return true;
  }
  */

  render () {
    return (
      <div className="writing-box">
        <textarea id="message-writing-box" value={this.state.message}
          onChange={this.handleChange}/>
        <button onClick={this.handleClick}>Send</button>
      </div>
    );
  }
}
