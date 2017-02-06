
import React from 'react';

import cn from 'classnames';
import create from '../componentFactory';
import connect from '../connectorFactory';

import { handleInputChange } from 'form-util';

import { SubmitButton } from '../common/Buttons';
import { TextInput, TextArea } from '../common/Inputs';
import Loading from '../common/Loading';
import EntryModel from '../../models/EntryModel';

const mapStateToProps = (state) => ({
  workingItem: state.api.entries.workingItem,
  isSaving: state.api.entries.isSaving
}); 

const mapDispatchToProps = (dispatch) => ({
  save(inst) { return dispatch(inst.save()) },
  fetch() { return dispatch(EntryModel.fetch()) }
});

const EntryForm = create({
  displayName: 'EntryForm',
  propTypes: {
    workingItem: React.PropTypes.object.isRequired,
    isSaving: React.PropTypes.bool.isRequired
  },
  _onSubmit(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const { workingItem } = this.props;
    if (!workingItem.valid) { return; }
    this.props.save(workingItem)
      .then(this.props.fetch);
  },
  render() {
    const { workingItem, isSaving } = this.props;
    return <div className={cn(
      'h100',
      'mxn1'
    )}>
      <form onSubmit={this._onSubmit} className='h100'>
        <div className="flex flex-column w100 h100">
          <span className="flex-g-item self-center w100 p1">
            <TextArea 
              onChange={handleInputChange(workingItem, 'text')} 
              value={workingItem.text} 
              disabled={isSaving}
              className='h100'
              placeholder={'what are you thinking?'}
            />
          </span>
          <span className="flex-item mb2 self-end">
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

export default connect(EntryForm, mapStateToProps, mapDispatchToProps);
