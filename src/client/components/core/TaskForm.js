
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { focusFirst } from 'dom-util';

import { SubmitButton } from '../common/Buttons';
import { TextInput, TextArea } from '../common/Inputs';

export default create({
  displayName: 'TaskForm',
  propTypes: {
    inputValue: React.PropTypes.string.isRequired,
    onAddItem: React.PropTypes.func.isRequired,
    onInputChange: React.PropTypes.func.isRequired
  },
  _onSubmit(ev) {
    ev.preventDefault();
    if (this.props.inputValue) {
      this.props.onAddItem(this.props.inputValue);
    }
  },
  componentDidMount() {
    focusFirst(this);
  },
  render() {
    const { inputValue, onAddItem, onRemoveItem, onInputChange } = this.props;
    return <div className={cn(
    )}>
      <form onSubmit={this._onSubmit}>
        <div className="my2">
          <div className="flex-gs-item mr1">
            <TextInput onChange={onInputChange} value={inputValue} />
          </div>
          <div className="">

          </div>
          <span className="flex-item">
            <SubmitButton />
          </span>
        </div>
      </form>
    </div>
  }
});
