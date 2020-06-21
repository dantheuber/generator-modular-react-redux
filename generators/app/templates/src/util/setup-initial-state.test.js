import setupInitialState from './setup-initial-state';

const state = { some: 'state' };
const pathname = 'test-path';
delete window.location;
window.location = { pathname };

describe('setup-initial-state utility', () => {
  it('builds new state with router', () => {
    expect(setupInitialState(state)).toEqual({
      ...state,
      router: { pathname },
    });
  });
});
