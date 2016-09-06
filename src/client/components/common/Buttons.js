
import React from 'react';

const buttonPropTypes = {
  text: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export function SubmitButton(props) {
  const { text, onClick } = props;
  return (
    <button type="submit" className="button" onClick={onClick}>
      <span>&#43;</span>
      {text && <span>{text}</span>}
    </button>
  );
}
SubmitButton.propTypes = buttonPropTypes;

export function RemoveButton(props) {
  const { text, onClick } = props;
  return (
    <button type="button" className="button button-small button-light" onClick={onClick}>
      <span>{'X'}</span>
    </button>
  );
}
RemoveButton.propTypes = buttonPropTypes;

// export all buttons on default
export default {
  SubmitButton,
  RemoveButton
}
