
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { store } from '../../redux';

import EntryModel from '../../models/EntryModel';
import EntryConnector from '../../connectors/EntryConnector';

export default create({
  displayName: 'EntryList',
  propTypes: {
    entries: React.PropTypes.array.isRequired
  },
  componentWillMount() {
    store.dispatch(EntryModel.fetch());
  },
  render() {
    const { entries } = this.props;
    return <div className={cn(
      'mh100',
      'list'
    )}>
      {entries.map((entry, i) => <EntryConnector key={i} entry={entry} isLast={(i === entries.length - 1)} />)}
    </div>
  }
});
