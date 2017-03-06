
import fetch from 'isomorphic-fetch'
import url from 'url';

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

export default function createFetch({ path, method, start, success, fail, body, params }) {
  return function(dispatch) {
    dispatch(start())
    return fetch(url.format({
      pathname: path,
      query: params
    }), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: body && JSON.stringify(body),
      method
    })
    // http error codes handled here
    .then(handleResponse)
    .then(res => {
      dispatch(success(res))
      return res;
    })
    // app logic errors here
    .catch((err) => {
      console && console.error(err);
      fail(err);
    })
  }
}
