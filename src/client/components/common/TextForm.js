
import React from 'react';
import R from 'ramda';
import cn from 'classnames';
import create from '../componentFactory';

import { SubmitButton } from './Buttons';
import { TextInput, TextArea } from './Inputs';

export default create({
  displayName: 'TextForm',
  propTypes: {
    inputValue: React.PropTypes.string.isRequired,
    onAdd: React.PropTypes.func.isRequired,
    onInputChange: React.PropTypes.func.isRequired,
    textArea: React.PropTypes.bool
  },
  _onSubmit(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    // trim whitespace on submit
    const val = R.trim(this.props.inputValue);
    if (val) {
      this.props.onAdd(val);
    } else {

    }
  },
  _onTextAreaKeyUp(ev) {
    // submit the form on TextArea enter, unless shift is pressed
    if (ev.keyCode === 13 && !ev.shiftKey) {
      this._onSubmit(ev);
    }
  },
  _onInputChange(ev) {
    const val = ev.currentTarget.value;
    this.props.onInputChange(val);
  },
  render() {
    const { inputValue, onInputChange, textArea } = this.props;
    const Input = textArea ? TextArea : TextInput;
    return <div className={cn(
    )}>
      <form onSubmit={this._onSubmit}>
        <div className="flex items-center w100 my2">
          <span className="flex-gs-item mr1">
            <Input onChange={this._onInputChange} value={inputValue} onKeyUp={textArea && this._onTextAreaKeyUp} />
          </span>
          <span className="flex-item">
            <SubmitButton />
          </span>
        </div>
      </form>
    </div>
  }
});
