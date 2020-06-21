import { count } from './selectors';
import * as types from './action-types';

export const increaseCount = () => ({ type: types.INCREASE_COUNT });
export const decreaseCount = () => ({ type: types.DECREASE_COUNT });
export const resetCount = () => ({ type: types.RESET_COUNT });

export const updateRandom = () => (dispatch, getState) => {
  const state = getState();
  const max = count(state);
  const randomNumber = Math.floor(Math.random() * max);
  dispatch({
    type: types.UPDATE_RANDOM,
    payload: randomNumber,
  });
};
