import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import * as types from './action-types';
import * as actions from './actions';

const mockStore = configureStore([reduxThunk]);

describe('<%= moduleName %> actions', () => {
  it(`#toggleshow() dispatches ${types.TOGGLE_SHOW} action`, () => {
    const store = mockStore({});
    store.dispatch(actions.toggleShow());
    expect(store.getActions()).toEqual([{ type: types.TOGGLE_SHOW }]);
  });
});
