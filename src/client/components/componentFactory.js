
import isEqual from 'lodash/fp/isEqual';

import React from 'react';

export default function create(args) {
  const extendedArgs = Object.assign({}, args,{
    shouldComponentUpdate(props, state) {
      return !isEqual(this.props, props) || !isEqual(this.state, state);
    }
  });
  return React.createClass(extendedArgs);
}
