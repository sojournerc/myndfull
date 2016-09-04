
import React from 'react';

const buttonPropTypes = {
  text: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
}

export function AddButton(props) {
  const { text, onClick } = props;
  return (
    <button className="button" onClick={onClick}>
      <span className="p1">&#43;</span>
      <span className="p1">{text}</span>
    </button>
  );
}
AddButton.propTypes = buttonPropTypes;

// export all buttons on default
export default {
  AddButton
}
