
import fetch from 'isomorphic-fetch'

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
      .then(response => {
        if (response.status === 204) {
          return response;
        }
        return response.json();
      })
      .then(json =>
        dispatch(success(json))
      )
      .catch(fail())
  }
}
