
import React from 'react';
import R from 'ramda';

export default function create(args) {
  const extendedArgs = Object.assign({}, args,{
    shouldComponentUpdate(props, state) {
      return !R.equals(this.props, props) || !R.equals(this.state, state);
    }
  });
  return React.createClass(extendedArgs);
}
