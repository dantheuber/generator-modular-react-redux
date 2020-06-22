import React from 'react';
import PropTypes from 'prop-types';

export const <%= camelName %> = ({
  show,
  toggleShow,
}) => (
  <div>
    { show && <h1>Shown!</h1> }
    <button id="toggle" onClick={toggleShow}>{ show ? 'hide': 'show' }</button>
  </div>
);

<%= camelName %>.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
};

<%= camelName %>.displayName = '<%= camelName %>';
