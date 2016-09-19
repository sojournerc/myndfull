
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import Header from '../common/Header';

/** Desktop Layout Specific Elements */
import PaneLeft from './PaneLeft';
import Main from './Main';

export default create({
  displayName: 'DesktopLayout',
  render() {
    return <div id="DesktopLayout" className={cn(
    )}>
      <Header isMobile={false} onViewChange={() => undefined} />
      <div id="BodyInner">
        <div className={cn(
          'h100',
          'flex',
          'flex-row'
        )}>
          <PaneLeft />
          <Main />
        </div>
      </div>
    </div>
  }
});
