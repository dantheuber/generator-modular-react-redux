import { NAME } from './constants';
import * as selectors from './selectors';

const state = {
  [NAME]: {
    show: true,
  },
};

describe('example selectors', () => {
  it('show() returns show from state', () => {
    expect(selectors.show(state)).toEqual(true);
  });
});
