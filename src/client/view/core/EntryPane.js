
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import EntryList from './EntryList';
import EntryForm from './EntryForm';

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
      <div className="overflow-auto flex-gs-38">
        <EntryList />
      </div>
      <div className="theme5-bg px2 flex-gs-62">
        <EntryForm />
      </div>
    </div>
  }
});
