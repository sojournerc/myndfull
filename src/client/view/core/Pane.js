
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import connect from '../connectorFactory';

import { showForm, hideForm } from '../../state/ui/actions';

import { AddButton, CloseButton } from '../common/Buttons';

import Form from './Form';
import List from '../common/List';

const mapStateToProps = (state, props) => ({
  items: state.api[props.ItemClass.API_PATH].items,
  itemsLoading: state.api[props.ItemClass.API_PATH].isFetching,
  showingForm: !!state.ui.showingForm[props.ItemClass.TYPE]
});

const mapDispatchToProps = (dispatch, props) => ({
  onShowForm() {
    dispatch(showForm(props.ItemClass.TYPE));
  },
  onHideForm() {
    dispatch(hideForm(props.ItemClass.TYPE));
  },
  onNewWorkingItem() {
    const newInstance = new props.ItemClass();
    dispatch(newInstance.makeWorkingItem());
  },
  onFetch() {
    dispatch(props.ItemClass.fetch());
  }
});

const Pane = create({
  displayName: 'Pane',
  propTypes: {
    items: React.PropTypes.array.isRequired,
    itemsLoading: React.PropTypes.bool.isRequired,
    showingForm: React.PropTypes.bool.isRequired,
    onShowForm: React.PropTypes.func.isRequired,
    onHideForm: React.PropTypes.func.isRequired,
    ItemClass: React.PropTypes.func.isRequired,
    onNewWorkingItem: React.PropTypes.func.isRequired,
    onFetch: React.PropTypes.func.isRequired
  },
  componentWillMount() {
    this.props.onFetch();
  },
  _handleAddItem() {
    this.props.onNewWorkingItem();
    this.props.onShowForm();
  },
  render() {
    const {
      showingForm,
      onHideForm,
      ItemClass,
      items,
      itemsLoading
    } = this.props;

    return (
    <div
      className={cn(
        'flex',
        'flex-column',
        'h100',
        'w100'
      )}
    >
      <div className="py2 flex-item">
        <div className="flex flex-row justify-between items-center px2">
          <span className="h4 flex-item bold">{ItemClass.TYPE}</span>
          <span className="flex-item">
            {showingForm &&
            <CloseButton onClick={onHideForm} />
            ||
            <AddButton onClick={this._handleAddItem} text="new" />
            }
          </span>
        </div>
      </div>
      <div className="flex-s-50 overflow-auto px2 mb2">
        {showingForm &&
        <Form ItemClass={ItemClass} />
        ||
        <List
          ItemClass={ItemClass}
          onShowForm={this.props.onShowForm}
          items={items}
          itemsLoading={itemsLoading}
        />
        }
      </div>
    </div>
    );
  }
});

export default connect(Pane, mapStateToProps, mapDispatchToProps);
