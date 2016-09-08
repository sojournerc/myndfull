
import React from 'react';

const inputPropTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

export function TextInput(props) {
  const { value, onChange } = props;
  return (
    <input
      type="text"
      // Matches MAXCHAR of STRING datatype in postgreSQL
      maxLength="255"
      className="input"
      onChange={onChange}
      value={value}
    />
  );
}
TextInput.propTypes = inputPropTypes;

export function TextArea(props) {
  const { value, onChange, onKeyUp } = props;
  return (
    <textarea type="text" className="input" onChange={onChange} value={value} onKeyUp={onKeyUp} />
  );
}
TextArea.propTypes = Object.assign({}, inputPropTypes, {
  onKeyUp: React.PropTypes.func
});

// export all buttons on default
export default {
  TextInput,
  TextArea
}
