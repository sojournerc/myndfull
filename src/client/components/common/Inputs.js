
import React from 'react';

import {
  STRING,
  TEXT
} from '../../constants/field-types.js';

export const FIELD_MAP = {
  [STRING]: TextInput,
  [TEXT]: TextArea
}

const inputPropTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

function _passInputValue(handler) {
  return function(ev) {
    const val = ev.currentTarget.value;
    handler(val);
  }
}

export function TextInput(props) {
  const { value, onChange, disabled } = props;
  return (
    <input
      type="text"
      // Matches MAXCHAR of STRING datatype in postgreSQL
      maxLength="255"
      className="input"
      onChange={_passInputValue(onChange)}
      value={value}
      disabled={disabled}
    />
  );
}
TextInput.propTypes = inputPropTypes;

/**
 * Text Area Component
 */
export function TextArea(props) {
  const { value, onChange, onKeyDown, disabled } = props;
  return (
    <textarea 
      type="text" 
      className="input" 
      onChange={_passInputValue(onChange)} 
      value={value} 
      onKeyDown={onKeyDown}
      disabled={disabled}
    />
  );
}
TextArea.propTypes = Object.assign({}, inputPropTypes, {
  onKeyDown: React.PropTypes.func
});

export default {
  TextInput,
  TextArea
}
