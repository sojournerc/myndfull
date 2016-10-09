
import React from 'react';

import cn from 'classnames';
import create from '../componentFactory';

import { handleInputChange } from 'form-util';

import { SubmitButton } from '../common/Buttons';
import { TextInput, TextArea } from '../common/Inputs';
import Loading from '../common/Loading';

export default create({
  displayName: 'TextForm',
  propTypes: {
    workingItem: React.PropTypes.object.isRequired,
    isSaving: React.PropTypes.bool.isRequired
  },
  _onSubmit(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const { workingItem } = this.props;
    if (!workingItem.valid) { return; }
    workingItem.save();
  },
  _handleKeyDown(ev) {
    // submit the form on TextArea enter, unless shift is pressed
    if (ev.keyCode === 13 && !ev.shiftKey) {
      this._onSubmit(ev);
    }
  },
  render() {
    const { workingItem, isSaving } = this.props;
    return <div className={cn(
    )}>
      <form onSubmit={this._onSubmit}>
        <div className="flex items-center w100 my2">
          <span className="flex-gs-item mr1">
            <TextArea 
              onChange={handleInputChange(workingItem, 'text')} 
              value={workingItem.text} 
              onKeyDown={this._handleKeyDown} 
              disabled={isSaving}
            />
          </span>
          <span className="flex-item">
            {isSaving &&
            <Loading />
            ||
            <SubmitButton text="submit" />}
          </span>
        </div>
      </form>
    </div>
  }
});
