import { testImmutable, testDefaults } from '../../tests/reducer-tests';
import asyncReducer from './async-reducer';

const defaultState = {
  loading: false,
  loaded: false,
  error: false,
  data: undefined,
};
const types = {
  loading: 'LOADING',
  loaded: 'LOADED',
  error: 'ERROR',
};

describe('async-reducer utility', () => {
  const reducer = asyncReducer(types);
  describe('defaults', testDefaults(reducer, defaultState));
  describe('loading action type', () => {
    const action = { type: types.loading };
    it('is immutable', testImmutable(reducer, defaultState, action));
    it('sets loading true', () => {
      expect(reducer(defaultState, action).loading).toBe(true);
    });
  });
  describe('loaded action type', () => {
    const payload = 'the payload';
    const action = {
      type: types.loaded,
      payload,
    };
    it('is immutable', testImmutable(reducer, defaultState, action));
    it('sets loaded true and data to payload', () => {
      const reduced = reducer(defaultState, action);
      expect(reduced.loaded).toBe(true);
      expect(reduced.data).toBe('the payload');
    });
  });
  describe('error action', () => {
    const action = { type: types.error };
    it('is immutable', testImmutable(reducer, defaultState, action));
    it('sets error true', () => {
      expect(reducer(defaultState, action).error).toBe(true);
    });
  });
  it('accepts a post reducer as second parameter to modify data custom', () => {
    const postAction = { type: 'SOME_ACTION', payload: true };
    const postReducer = (state, action) => ({
      ...state,
      addedInPost: action.payload,
    });
    const withPostReducer = asyncReducer(types, postReducer);
    expect(withPostReducer(defaultState, postAction).addedInPost).toBe(true);
  });
});
