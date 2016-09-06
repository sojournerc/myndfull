
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import LogInput from '../../connectors/LogInput';

export default create({
  displayName: 'FooterContent',
  propTypes: {
  },
  render() {
    return <div id="FooterContent" className={cn(
      'h100',
      'flex',
      'flex-row',
      'items-center',
      'px2'
    )}>
      <div className="flex-gs-38">
      </div>
      <div className="flex-gs-62">
        <LogInput />
      </div>
    </div>
  }
});
