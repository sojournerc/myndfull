
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { store } from '../../redux';

import { fetchEntries } from '../../redux/entries/actions';

import EntryListConnect from '../../connectors/EntryPaneConnector';

export default create({
  displayName: 'MainContent',
  propTypes: {

  },
  componentWillMount() {
    store.dispatch(fetchEntries());
  },
  render() {
    return <div id="MainContent" className={cn(
      'h100',
      'flex',
      'flex-column',
      'justify-end'
    )}>
      <EntryListConnect />
    </div>
  }
});
