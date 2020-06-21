import { combineReducers } from 'redux';
import * as types from './action-types';

const count = (state = 0, action) => {
  switch (action.type) {
    case types.INCREASE_COUNT:
      return state + 1;
    case types.DECREASE_COUNT:
      return state - 1;
    case types.RESET_COUNT:
      return 0;
    default:
      return state;
  }
};

const randomNumber = (state = 0, action) => {
  switch (action.type) {
    case types.UPDATE_RANDOM:
      return action.payload;
    default:
      return state;
  }
};

export const reducer = combineReducers({
  count,
  randomNumber,
});
