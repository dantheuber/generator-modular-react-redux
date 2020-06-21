import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import * as types from './action-types';
import * as actions from './actions';

jest.mock('./selectors', () => ({
  count: jest.fn().mockReturnValue(1),
}));

const mockStore = configureStore([reduxThunk]);

describe('example actions', () => {
  it(`#increaseCount() dispatches ${types.INCREASE_COUNT} action`, () => {
    const store = mockStore({});
    store.dispatch(actions.increaseCount());
    expect(store.getActions()).toEqual([{ type: types.INCREASE_COUNT }]);
  });
  it(`#decreaseCount dispatches ${types.DECREASE_COUNT} action`, () => {
    const store = mockStore({});
    store.dispatch(actions.decreaseCount());
    expect(store.getActions()).toEqual([{ type: types.DECREASE_COUNT }]);
  });
  it(`#resetCount dispatches ${types.RESET_COUNT} action`, () => {
    const store = mockStore({});
    store.dispatch(actions.resetCount());
    expect(store.getActions()).toEqual([{ type: types.RESET_COUNT }]);
  });
  it(`#updateRandom() dispatches ${types.UPDATE_RANDOM} action`, () => {
    const store = mockStore({});
    store.dispatch(actions.updateRandom());
    expect(store.getActions()).toEqual([{
      type: types.UPDATE_RANDOM,
      payload: expect.any(Number),
    }]);
  });
});
