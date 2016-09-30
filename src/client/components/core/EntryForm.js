
import React from 'react';

import cn from 'classnames';
import create from '../componentFactory';

import { handleInputChange } from 'form-util';

import { SubmitButton } from '../common/Buttons';
import { TextInput, TextArea } from '../common/Inputs';

export default create({
  displayName: 'TextForm',
  propTypes: {
    workingItem: React.PropTypes.object.isRequired
  },
  _onSubmit(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    // trim whitespace on submit
    const val = this.props.workingItem.text;
    if (val) {
      this.props.workingItem.save();
    }
  },
  _onTextAreaKeyUp(ev) {
    // submit the form on TextArea enter, unless shift is pressed
    if (ev.keyCode === 13 && !ev.shiftKey) {
      this._onSubmit(ev);
    }
  },
  render() {
    const { workingItem } = this.props;
    return <div className={cn(
    )}>
      <form onSubmit={this._onSubmit}>
        <div className="flex items-center w100 my2">
          <span className="flex-gs-item mr1">
            <TextArea 
              onChange={handleInputChange(workingItem, 'text')} 
              value={workingItem.text} 
              onKeyUp={this._onTextAreaKeyUp} 
            />
          </span>
          <span className="flex-item">
            <SubmitButton />
          </span>
        </div>
      </form>
    </div>
  }
});
