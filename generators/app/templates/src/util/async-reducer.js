const DEFAULT_POST_REDUCER = state => state;
const DEFAULT_STATE = {
  loading: false,
  loaded: false,
  error: false,
  data: undefined,
};

const loading = state => ({
  ...state,
  loading: true,
});

const loaded = action => ({
  error: false,
  loading: false,
  loaded: true,
  data: action.payload,
});

const error = state => ({
  ...state,
  error: true,
  loading: false,
  loaded: true,
});

export default function asyncReducer(types, postReducer = DEFAULT_POST_REDUCER) {
  const reducer = (state, action) => {
    switch (action.type) {
      case types.loading:
        return loading(state);
      case types.loaded:
        return loaded(action);
      case types.error:
        return error(state);
      default:
        return state;
    }
  };

  return (state = DEFAULT_STATE, action) => postReducer(reducer(state, action), action);
}
