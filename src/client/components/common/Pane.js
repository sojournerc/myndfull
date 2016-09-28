
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import { store } from '../../redux';

import { AddButton, CloseButton } from '../common/Buttons';

import Editor from '../../connectors/Editor';

import List from './List';

export default create({
  displayName: 'Pane',
  propTypes: {
    onShowForm: React.PropTypes.func.isRequired,
    onHideForm: React.PropTypes.func.isRequired,
    items: React.PropTypes.array.isRequired,
    ItemClass: React.PropTypes.func.isRequired
  },
  componentWillMount() {
    debugger;
    
    // store.dispatch(fetchTasks());
  },
  render() {
    const { showingForm, onShowForm, onHideForm, ItemClass, items } = this.props;
    return <div className={cn(
      'flex',
      'flex-column',
      'h100',
      'w100'
    )}>
      <div className="py2 flex-item">
        <div className="flex flex-row justify-between items-center px2">
          <span className="h4 flex-item bold">{ItemClass.TYPE}</span>
          <span className="flex-item">
            {showingForm &&
            <CloseButton onClick={onHideForm} />
            ||
            <AddButton onClick={onShowForm} />
            }
          </span>
        </div>
      </div>
      <div className="flex-s-50 overflow-auto px2 mb2">
        {showingForm &&
        <Editor ItemClass={ItemClass} />
        ||
        <List items={items} />
        }
      </div>
    </div>
  }
});
