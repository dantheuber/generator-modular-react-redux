import clone from 'lodash.clone';

// This is an action that should not be processed by any reducer
const dummyAction = { type: 'SOME_ACTION' };

// Tests default behavior that all reducers should exhibit
export const testDefaults = (reducer, defaultState) => () => {
  it('return the expected default state when no state is provided', () => {
    expect(reducer(undefined, dummyAction)).toEqual(defaultState);
  });
  it('return state untouched for no matching action', () => {
    const initialState = clone(defaultState);
    const nextState = reducer(initialState, dummyAction);
    expect(nextState).toBe(initialState);
    expect(nextState).toEqual(defaultState);
  });
};

// Tests immutability that all reducer actions should exhibit
export const testImmutable = (reducer, defaultState, action) => () => {
  const initialState = clone(defaultState);
  const nextState = reducer(initialState, action);
  expect(nextState).not.toBe(initialState);
};
