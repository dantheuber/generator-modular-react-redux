import { testImmutable, testDefaults } from '../../tests/reducer-tests';
import * as types from './action-types';
import { reducer } from './reducer';

const defaultState = {
  count: 0,
  randomNumber: 0,
};

describe('example reducer', () => {
  describe('defaults', testDefaults(reducer, defaultState));
  describe(types.INCREASE_COUNT, () => {
    const action = { type: types.INCREASE_COUNT };
    it('is immutable', testImmutable(reducer, defaultState, action));
    it('increases the value of the count in state', () => {
      const testState = { count: 2 };
      expect(reducer(testState, action).count).toEqual(3);
    });
  });
  describe(types.DECREASE_COUNT, () => {
    const action = { type: types.DECREASE_COUNT };
    it('is immutable', testImmutable(reducer, defaultState, action));
    it('decreases the value of the count in state', () => {
      const testState = { count: 2 };
      expect(reducer(testState, action).count).toEqual(1);
    });
  });
  describe(types.RESET_COUNT, () => {
    const action = { type: types.RESET_COUNT };
    const testState = { count: 1 };
    it('is immutable', testImmutable(reducer, testState, action));
    it('sets count back to 0', () => {
      expect(reducer(testState, action).count).toEqual(0);
    });
  });
  describe(types.UPDATE_RANDOM, () => {
    const action = {
      type: types.UPDATE_RANDOM,
      payload: 3,
    };
    it('is immutable', testImmutable(reducer, defaultState, action));
    it('sets randomNumber to payload', () => {
      expect(reducer(defaultState, action).randomNumber).toEqual(action.payload);
    });
  });
});
