import { NAME } from './constants';
import * as selectors from './selectors';

const state = {
  [NAME]: {
    count: 1,
    randomNumber: 2,
  },
};

describe('example selectors', () => {
  it('count() returns count from state', () => {
    expect(selectors.count(state)).toEqual(1);
  });
  it('randomNumber() returns randomNumber from state', () => {
    expect(selectors.randomNumber(state)).toEqual(2);
  });
});
