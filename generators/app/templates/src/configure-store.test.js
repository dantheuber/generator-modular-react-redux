import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerForBrowser } from 'redux-little-router';
import setupInitialState from './util/setup-initial-state';
import { LOCAL_STORAGE_STATE_KEY } from './constants';
import configureStore from './configure-store';

jest.mock('./util/setup-initial-state');
jest.mock('redux', () => ({
  combineReducers: jest.fn(),
  compose: jest.fn(),
  createStore: jest.fn().mockReturnValue({
    getState: jest.fn().mockReturnValue({}),
  }),
  applyMiddleware: jest.fn(),
}));
jest.mock('redux-thunk');
jest.mock('redux-logger', () => 'redux logger');
jest.mock('redux-little-router', () => ({
  routerForBrowser: jest.fn().mockReturnValue({
    reducer: () => 'router reducer',
    middleware: () => 'router middleware',
    enhancer: () => 'router enhancer',
  }),
  initializeCurrentLocation: jest.fn().mockReturnValue({ type: 'INIT_LOCATION' }),
}));
jest.mock('./reducers', () => ({
  someReducer: () => 'some reducer',
}));

// const defaultState = {
//   router: {},
// };
const listenerSpy = jest.fn();
delete window.addEventListener;
window.addEventListener = listenerSpy;

global.sessionStorage = {
  getItem: jest.fn().mockReturnValue('{}'),
  setItem: jest.fn(),
};

describe('store', () => {
  const mockStore = {
    getState: jest.fn().mockReturnValue({}),
    dispatch: jest.fn(),
  };
  beforeEach(() => {
    applyMiddleware.mockImplementation((...args) => [...args]);
    combineReducers.mockImplementation(() => 'combined reducers');
    createStore.mockImplementation((...args) =>
      ({ ...mockStore, args: [...args] }),
    );
    process.env.NODE_ENV = 'test';
  });
  it('uses empty object if stored state is not object', () => {
    global.sessionStorage.getItem.mockReturnValueOnce(null);
    configureStore();
    expect(setupInitialState).toHaveBeenCalledWith({});
  });
  it('adds the redux-logger middleware if local dev', () => {
    process.env.NODE_ENV = 'dev';
    const { middleware: routerMiddleware } = routerForBrowser();
    configureStore();
    expect(applyMiddleware).toHaveBeenCalledWith(reduxThunk, routerMiddleware, 'redux logger');
  });
  it('sets up beforeunload event listener to store current state in session storage', () => {
    expect(listenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    configureStore();
    listenerSpy.mock.calls[0][1]();
    expect(global.sessionStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_STATE_KEY, '{}');
  });
});
