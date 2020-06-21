import { FETCH_OPTIONS } from './fetch';

const append = jest.fn();
class ParamMock {
  append = append;
}
global.URLSearchParams = ParamMock;

const data = { some: 'data' };

describe('fetch helpers', () => {
  it('POST_FORM returns options with form data on body', () => {
    expect(FETCH_OPTIONS.POST_FORM(data)).toEqual({
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: new ParamMock(),
    });
    expect(append).toHaveBeenCalledWith('some', 'data');
  });
  it('PUT_JSON_WITH_AUTH returns options with stringified data on body', () => {
    expect(FETCH_OPTIONS.PUT_JSON_WITH_AUTH(data)).toEqual({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
  });
  it('POST_JSON_WITH_AUTH returns options with stringified data on body', () => {
    expect(FETCH_OPTIONS.POST_JSON_WITH_AUTH(data)).toEqual({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
  });
  it('GET_JSON_WITH_AUTH equals proper options', () => {
    expect(FETCH_OPTIONS.GET_JSON_WITH_AUTH).toEqual({
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    });
  });
  it('DELETE_WITH_AUTH equals proper options', () => {
    expect(FETCH_OPTIONS.DELETE_WITH_AUTH).toEqual({
      method: 'DELETE',
      credentials: 'include',
    });
  });
});
