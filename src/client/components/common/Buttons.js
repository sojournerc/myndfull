
import React from 'react';

const buttonPropTypes = {
  text: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export function AddButton(props) {
  const { text, onClick } = props;
  return (
    <button type="button" className="button button-light" onClick={onClick}>
      <span>&#x254b;</span>
      {text && <span>{text}</span>}
    </button>
  );
}
SubmitButton.propTypes = buttonPropTypes;

export function SubmitButton(props) {
  const { text, onClick } = props;
  return (
    <button type="submit" className="button" onClick={onClick}>
      <span>&#x254b;</span>
      {text && <span>{text}</span>}
    </button>
  );
}
SubmitButton.propTypes = buttonPropTypes;

export function RemoveButton(props) {
  const { text, onClick } = props;
  return (
    <button type="button" className="button button-x-small button-round button-light" onClick={onClick}>
      <span>&#x2715;</span>
    </button>
  );
}
RemoveButton.propTypes = buttonPropTypes;

export function CloseButton(props) {
  const { text, onClick } = props;
  return (
    <button type="button" className="button button-light button-round" onClick={onClick}>
      <span>&#x2715;</span>
    </button>
  );
}
CloseButton.propTypes = buttonPropTypes;

// export all buttons on default
export default {
  AddButton,
  SubmitButton,
  RemoveButton,
  CloseButton
}
