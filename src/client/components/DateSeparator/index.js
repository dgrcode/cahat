'use strict';
import './style.sass';

import React from 'react';
import PropTypes from 'prop-types';

export default function DateSeparator (props) {
  return (
    <div className={`date-separator ${props.sticky ? 'sticky' : null}`}>
      <hr/>
      <span className="date">{props.date}</span>
      <hr/>
    </div>
  );
}

DateSeparator.propTypes = {
  date: PropTypes.string.isRequired,
  sticky: PropTypes.bool
};
