
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import EntryListConnector from '../../connectors/EntryListConnector';
import EntryFormConnector from '../../connectors/EntryFormConnector';

export default create({
  displayName: 'EntryPane',
  propTypes: {

  },
  render() {
    return <div className={cn(
      'h100',
      'w100',
      'flex',
      'flex-column',
      'justify-end'
    )}>
      <div className="overflow-auto">
        <EntryListConnector />
      </div>
      <div className="theme5-bg px2 flex-item">
        <EntryFormConnector />
      </div>
    </div>
  }
});
