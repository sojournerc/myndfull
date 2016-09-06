
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import Entry from './Entry';

export default create({
  displayName: 'EntryList',
  propTypes: {
    entries: React.PropTypes.array.isRequired
  },
  render() {
    const { entries } = this.props;
    return <div id={'EntryList'} className={cn(
      'mh100',
      'overflow-auto'
    )}>
      {entries.map((entry, i) => <Entry key={i} entry={entry} />)}
    </div>
  }
});
