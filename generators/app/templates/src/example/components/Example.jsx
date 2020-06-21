import React from 'react';
import PropTypes from 'prop-types';

export const Example = ({
  count,
  randomNumber,
  increaseCount,
  decreaseCount,
  resetCount,
}) => (
  <div>
    count: { count } - Random: { randomNumber }
    <hr />
    <button id="increase" onClick={increaseCount}>Increase</button>
    <button id="decrease" onClick={decreaseCount}>Decrease</button>
    <button id="reset" onClick={resetCount}>Reset</button>
  </div>
);

Example.propTypes = {
  count: PropTypes.number.isRequired,
  randomNumber: PropTypes.number.isRequired,
  increaseCount: PropTypes.func.isRequired,
  decreaseCount: PropTypes.func.isRequired,
  resetCount: PropTypes.func.isRequired,
};

Example.displayName = 'Example';
