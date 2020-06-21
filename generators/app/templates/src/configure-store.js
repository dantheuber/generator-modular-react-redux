import {
  combineReducers,
  compose,
  createStore,
  applyMiddleware,
} from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { routerForBrowser } from 'redux-little-router';
import setupInitialState from './util/setup-initial-state';
import { routes } from './router/routes';
import reducers from './reducers';
import { LOCAL_STORAGE_STATE_KEY } from './constants';

const configureStore = () => {
  const storedState = JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_STATE_KEY)) || {};

  const routerBasename = '/';
  const {
    reducer: routerReducer,
    middleware: routerMiddleware,
    enhancer: routerEnhancer,
  } = routerForBrowser({
    routes,
    baseName: routerBasename,
  });

  const middleware = [
    reduxThunk,
    routerMiddleware,
  ];

  // create-react-app build overrides NODE_ENV with "production"
  // so we use our own env variable for development builds.
  if (['development', 'dev', 'local'].includes(process.env.NODE_ENV)) {
    middleware.push(reduxLogger);
  }

  const store = createStore(
    combineReducers({ router: routerReducer, ...reducers }),
    setupInitialState(storedState),
    compose(routerEnhancer, applyMiddleware(...middleware)),
  );

  // stores redux state in session storage
  window.addEventListener('beforeunload', () => {
    const saveState = {
      ...store.getState(),
      router: undefined,
    };
    sessionStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(saveState));
  });

  return store;
};

export default configureStore;
