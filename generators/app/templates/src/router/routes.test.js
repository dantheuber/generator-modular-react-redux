import { routes } from './routes';

describe('routes', () => {
  it('exports routes object', () => {
    expect(routes).toEqual(expect.any(Object));
  });
});
