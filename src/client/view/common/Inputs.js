
import React from 'react';

import {
  STRING,
  TEXT,
  SELECT
} from '../../constants/field-types.js';


const inputPropTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string
};

function _passInputValue(handler) {
  return function(ev) {
    const val = ev.currentTarget.value;
    handler(val);
  };
}

export function TextInput(props) {
  const { value, onChange, disabled, className, placeholder } = props;
  return (
    <input
      type="text"
      // Matches MAXCHAR of STRING datatype in postgreSQL
      maxLength="255"
      placeholder={placeholder}
      className={`input ${className || ''}`}
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
  const { value, onChange, onKeyDown, disabled, className, placeholder } = props;
  return (
    <textarea
      type="text"
      className={`input ${className || ''}`}
      onChange={_passInputValue(onChange)}
      value={value}
      onKeyDown={onKeyDown}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
}
TextArea.propTypes = Object.assign({}, inputPropTypes, {
  onKeyDown: React.PropTypes.func
});


/**
 * SELECT component
 */
export function Select({ options, onChange, value, disabled }) {
  return (
    <select
      value={value}
      onChange={(e, i, v) => { onChange(v); }}
      disabled={disabled}
    >
      {options && options.map(opt => (
        <option key={opt.id} value={opt.id}>{opt.text}</option>
      ))}
    </select>
  );
}
Select.propTypes = Object.assign({}, inputPropTypes, {
  options: React.PropTypes.array,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired
});


export const FIELD_MAP = {
  [STRING]: TextInput,
  [TEXT]: TextArea,
  [SELECT]: Select
};

export default {
  TextInput,
  TextArea,
  Select
};
