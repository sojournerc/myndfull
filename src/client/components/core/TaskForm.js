
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { focusFirst, handleInputChange } from 'form-util';

import { SubmitButton } from '../common/Buttons';
import { TextInput, TextArea } from '../common/Inputs';

export default create({
  displayName: 'TaskForm',
  propTypes: {
    onAddItem: React.PropTypes.func.isRequired,
    formValues: React.PropTypes.object.isRequired,
    onFormChange: React.PropTypes.func.isRequired
  },
  _onSubmit(ev) {
    ev.preventDefault();
    // TODO: validate!!!
    if (this.props.formValues) {
      this.props.onAddItem(this.props.formValues);
    }
  },
  componentDidMount() {
    focusFirst(this);
  },
  render() {
    const { formValues, onFormChange, onAddItem, onRemoveItem } = this.props;
    return <div className={cn(
    )}>
      <form onSubmit={this._onSubmit}>
        <div className="my2">
          <div className="flex-gs-item mr1">
            <TextInput onChange={handleInputChange('text', onFormChange)} value={formValues.text} />
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
