
import React from 'react';
import cn from 'classnames';
import map from 'lodash/map';
import create from '../componentFactory';
import { focusFirst, handleInputChange } from 'form-util';
import { store } from '../../redux';

import { hideForm } from '../../redux/ui/actions'; 

import { SubmitButton, RemoveButton } from '../common/Buttons';
import { FIELD_MAP } from '../common/Inputs';

export default create({
  displayName: 'Form',
  propTypes: {
    ItemClass: React.PropTypes.func.isRequired,
    workingItem: React.PropTypes.object.isRequired
  },
  componentDidMount() {
    focusFirst(this);
  },
  _onSubmit(ev) {
    ev.preventDefault();
    this.props.workingItem.save().then(() => {
      store.dispatch(hideForm());
    });
  },
  _onRemove(ev) {
    this.props.workingItem.remove().then(() => {
      store.dispatch(hideForm());
    });
  },
  render() {
    const { ItemClass, workingItem } = this.props;
    const fields = ItemClass.FIELDS;
    return <div className={cn(
    )}>
      <form onSubmit={this._onSubmit}>
        <div className="flex flex-column w100">
          {map(fields, (field, key) => {
            const Field = FIELD_MAP[field.type];
            return (
              <div className="flex-gs-item mb1" key={key}>
                <Field
                  onChange={handleInputChange(workingItem, key)}
                  value={workingItem[key]}
                />
              </div>
            );
          })}
          <div className="flex-item">
            <div className="flex flex-row justify-around">
              {!workingItem.isNew &&
              <div className="flex-item">
                <RemoveButton onClick={this._onRemove} text={'remove'} />
              </div>}
              <div className="flex-item self-end">
                <SubmitButton text={(workingItem.isNew) ? 'create' : 'update'} />
              </div> 
            </div>
          </div>
        </div>
      </form>
    </div>
  }
});
