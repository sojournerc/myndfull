
import React from 'react';

const buttonPropTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}

export function TextInput(props) {
  const { value, onChange } = props;
  return (
    <input type="text" className="input" onChange={onChange} value={value} />
  );
}
TextInput.propTypes = buttonPropTypes;

// export all buttons on default
export default {
  TextInput
}
