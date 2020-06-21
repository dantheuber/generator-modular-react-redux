
export const API_REQUEST = 'API_REQUEST';
// TODO: write middleware to handle making api requests
export const FETCH_OPTIONS = {
  POST_FORM: (data) => {
    const formData = new URLSearchParams();
    Object.keys(data).map(objKey => formData.append(objKey, data[objKey]));
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: formData,
    };
  },
  PUT_JSON_WITH_AUTH: data => ({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }),
  POST_JSON_WITH_AUTH: data => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }),
  GET_JSON_WITH_AUTH: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  },
  DELETE_WITH_AUTH: {
    method: 'DELETE',
    credentials: 'include',
  },
};
