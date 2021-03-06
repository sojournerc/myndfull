
import React from 'react';
import cn from 'classnames';
import map from 'lodash/map';
import create from '../componentFactory';
import connect from '../connectorFactory';

import { focusFirst, handleInputChange } from 'form-util';
import { store } from '../../state';

import { hideForm } from '../../state/ui/actions'; 

import { SubmitButton, RemoveButton } from '../common/Buttons';
import Loading from '../common/Loading';
import { FIELD_MAP } from '../common/Inputs';


const mapStateToProps = (state, props) => ({
  workingItem: state.api[props.ItemClass.API_PATH].workingItem,
  isSaving: state.api[props.ItemClass.API_PATH].isSaving,
  ItemClass: props.ItemClass,
  foreignItems: (({ ItemClass }) => {
    const foreign = {};
    for (const f in ItemClass.FIELDS) {
      const field = ItemClass.FIELDS[f];
      if (field.foreign) {
        foreign[field.foreign.API_PATH] = state.api[field.foreign.API_PATH].items;
      }
    }
    return foreign;
  })(props)
});
const mapDispatchToProps = (dispatch, props) => ({
  save(inst) { return dispatch(inst.save()); },
  remove(inst) { return dispatch(inst.remove()); },
  fetch() { return dispatch(props.ItemClass.fetch()) },
  hideForm() { return dispatch(hideForm(props.ItemClass.TYPE)) }
});  

const Editor = create({
  displayName: 'Form',
  propTypes: {
    ItemClass: React.PropTypes.func.isRequired,
    workingItem: React.PropTypes.object.isRequired,
    isSaving: React.PropTypes.bool.isRequired,
    foreignItems: React.PropTypes.object.isRequired
  },
  componentDidMount() {
    focusFirst(this);
  },
  _onSubmit(ev) {
    ev.preventDefault();
    const { workingItem } = this.props;
    if (!workingItem.valid) { return; }
    this.props.save(workingItem)
    .then(this.props.fetch)
    .then(this.props.hideForm);
  },
  _onRemove(ev) {
    const { workingItem } = this.props;
    this.props.remove(workingItem)
    .then(this.props.fetch)
    .then(this.props.hideForm);
  },
  render() {
    const { ItemClass, workingItem, isSaving, foreignItems } = this.props;
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
                  disabled={isSaving}
                  options={field.foreign && foreignItems[field.foreign.API_PATH]}
                />  
              </div>
            );
          })}
          <div className="flex-item">
          {isSaving &&
          <div className="flex flex-row justify-around">
            <Loading />
          </div>
          ||
          <div className="flex flex-row justify-around">
            {!workingItem.isNew &&
            <div className="flex-item">
              <RemoveButton onClick={this._onRemove} text={'remove'} />
            </div>}
            <div className="flex-item self-end">
              <SubmitButton text={(workingItem.isNew) ? 'create' : 'update'} />
            </div> 
          </div>}
          </div>
        </div>
      </form>
    </div>
  }
});

export default connect(Editor, mapStateToProps, mapDispatchToProps);
