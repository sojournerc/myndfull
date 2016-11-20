
import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import {
  STRING,
  TEXT,
  SELECT
} from '../../constants/field-types.js';

export const FIELD_MAP = {
  [STRING]: TextInput,
  [TEXT]: TextArea,
  [SELECT]: Select
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
    <TextField
      type="text"
      // Matches MAXCHAR of STRING datatype in postgreSQL
      maxLength="255"
      className="input"
      onChange={_passInputValue(onChange)}
      value={value}
      disabled={disabled}
      fullWidth={true}
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
    <TextField 
      type="text" 
      className="input" 
      onChange={_passInputValue(onChange)} 
      value={value} 
      onKeyDown={onKeyDown}
      disabled={disabled}
      multiLine={true}
      fullWidth={true}
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
    <SelectField
      value={value}
      onChange={(e, i, v) => { onChange(v); }}
      maxHeight={200}
      anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
      fullWidth={true}
    >
      {options.map(opt => {
        return <MenuItem value={opt.id} key={opt.id} primaryText={opt.text} />
      })}
    </SelectField>
  );
}
Select.propTypes = Object.assign({}, inputPropTypes, {
  options: React.PropTypes.array.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired
});

export default {
  TextInput,
  TextArea,
  Select
}
 