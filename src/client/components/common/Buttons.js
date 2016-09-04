
import React from 'react';

const buttonPropTypes = {
  text: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
}

export function SubmitButton(props) {
  const { text, onClick } = props;
  return (
    <button type="submit" className="button" onClick={onClick}>
      <span className="p1 inline-block">&#43;</span>
      <span className="p1 inline-block">{text}</span>
    </button>
  );
}
SubmitButton.propTypes = buttonPropTypes;

// export all buttons on default
export default {
  SubmitButton
}
