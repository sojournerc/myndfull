
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { focusFirst } from 'dom-util';

import { SubmitButton } from '../common/Buttons';
import { TextInput } from '../common/Inputs';

export default create({
  displayName: 'GoalForm',
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
        <div className="flex items-center w100 my2">
          <span className="flex-gs-item mr1">
            <TextInput onChange={onInputChange} value={inputValue} />
          </span>
          <span className="flex-item">
            <SubmitButton />
          </span>
        </div>
      </form>
    </div>
  }
});
