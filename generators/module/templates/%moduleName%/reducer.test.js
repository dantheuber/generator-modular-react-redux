import { testImmutable, testDefaults } from '../../tests/reducer-tests';
import * as types from './action-types';
import { reducer } from './reducer';

const defaultState = {
  show: true,
};

describe('example reducer', () => {
  describe('defaults', testDefaults(reducer, defaultState));
  describe(types.TOGGLE_SHOW, () => {
    const action = { type: types.TOGGLE_SHOW };
    it('is immutable', testImmutable(reducer, defaultState, action));
    it('toggles value of show', () => {
      expect(reducer(defaultState, action).show).toEqual(false);
    });
  });
});
