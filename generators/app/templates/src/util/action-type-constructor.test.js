import actionTypeConstructor from './action-type-constructor';

const name = 'test';

describe('action-type-constructor utility', () => {
  it('returns a method to construct new action type strings', () => {
    expect(actionTypeConstructor(name)).toEqual(expect.any(Function));
  });
  it(`returned method returns strings combining ${name}/ACTION_TYPE`, () => {
    const ca = actionTypeConstructor(name);
    expect(ca('TEST_ACTION')).toEqual(`${name}/TEST_ACTION`);
  });
});
