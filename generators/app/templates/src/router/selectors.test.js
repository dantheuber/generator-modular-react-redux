import * as selectors from './selectors';

const state = {
  router: {
    result: 'resultvalue',
    pathname: '/pathname',
    key: 'keyvalue',
    params: {
      param: 'values',
    },
  },
};

describe('router selectors', () => {
  it('result() returns result value from state', () => {
    expect(selectors.result(state)).toEqual('resultvalue');
  });
  it('pathname() returns pathname value from state', () => {
    expect(selectors.pathname(state)).toEqual('/pathname');
  });
  it('key() returns key value from state', () => {
    expect(selectors.key(state)).toEqual('keyvalue');
  });
  it('params() returns param values from state', () => {
    expect(selectors.params(state)).toEqual({ param: 'values' });
  });
});
