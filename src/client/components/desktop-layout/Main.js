
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import EntryPane from '../core/EntryPane';

export default create({
  displayName: 'Main',
  propTypes: {
    children: React.PropTypes.node
  },

  render() {
    return <div id="Main" className={cn(
      {
        'flex-gs-60': true
      }
    )}>
      <EntryPane />
    </div>
  }
});
