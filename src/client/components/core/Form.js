
import React from 'react';
import cn from 'classnames';
import map from 'lodash/map';
import create from '../componentFactory';
import { focusFirst, handleInputChange } from 'form-util';

import { SubmitButton } from '../common/Buttons';
import { FIELD_MAP } from '../common/Inputs';

export default create({
  displayName: 'Form',
  propTypes: {
    ModelClass: React.PropTypes.func.isRequired,
    workingItem: React.PropTypes.object.isRequired
  },
  _onSubmit(ev) {
    ev.preventDefault();
    // TODO: validate!!!
    this.props.onSubmitItem(this.props.formValues);
  },
  componentDidMount() {
    focusFirst(this);
  },
  render() {
    const { ModelClass, workingItem } = this.props;
    const fields = ModelClass.FIELDS;
    return <div className={cn(
    )}>
      <form onSubmit={this._onSubmit}>
        <div className="flex flex-column w100">
          {map(fields, (field, key) => {
            const Field = FIELD_MAP[field.type];
            return (
              <div className="flex-gs-item mb1" key={key}>
                <Field
                  onChange={handleInputChange(ModelClass.propChange, workingItem, key)}
                  value={workingItem[key]}
                />
              </div>
            );
          })}
          <span className="flex-item right-align">
            <SubmitButton />
          </span>
        </div>
      </form>
    </div>
  }
});
          //   <TextInput onChange={handleInputChange('text', onPropChange)} value={workingTask.text} />
          // </div>
          // <div className="flex-gs-item mb1">
          //   <TextArea onChange={handleInputChange('notes', onPropChange)} value={workingTask.notes} />
          // </div>
