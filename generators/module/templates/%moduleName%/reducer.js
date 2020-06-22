import { combineReducers } from 'redux';
import * as types from './action-types';

const show = (state = true, action) => {
  switch (action.type) {
    case types.TOGGLE_SHOW:
      return !state;
    default:
      return state;
  }
};

export const reducer = combineReducers({
  show,
});
