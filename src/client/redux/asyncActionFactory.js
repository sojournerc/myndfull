
import fetch from 'isomorphic-fetch'

export default function createAsync(url, start, success, fail) {
  return function(dispatch) {
    dispatch(start)
    return fetch(url)
      .then(response => response.json())
      .then(json =>
        dispatch(success(json))
      )
      .catch(fail)
  }
}
