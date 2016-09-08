
import fetch from 'isomorphic-fetch'

const _2XX = /^2\d\d$/;
const _4XX = /^4\d\d$/;
const _5XX = /^5\d\d$/;

function handleResponse(response) {
  if (_2XX.test(response.status)) {
    if (response.status === 204) {
      return true;
    } else {
      return response.json();
    }
  } else if (_4XX.test(response.status) || _5XX.test(response.status)) {
    throw new Error(response.json().message)
  } else {
    throw new Error('Unknown Error')
  }
}

export default function createFetch({ url, method, start, success, fail, body }) {
  return function(dispatch) {
    dispatch(start())
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: body && JSON.stringify(body),
      method
    })
    .then(handleResponse)
    .then(res =>
      dispatch(success(res))
    )
    .catch(fail)
  }
}
