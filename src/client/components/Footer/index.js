'use strict';
import './style.sass';

import React from 'react';

export default class Footer extends React.Component {
  render () {
    return (
      <div className="footer">
        Made with <span className="love">♥</span> by <a href="https://github.com/dgrcode" target="_blank">dgrcode</a>
      </div>
    );
  }
}
