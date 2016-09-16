
import React from 'react';
import create from './componentFactory';
import cn from 'classnames';


import { getViewport } from 'dom-util';

import DraggingIndicator from '../connectors/DraggingIndicator';

/** Layout Elements */
import MobileLayoutConnector from '../connectors/MobileLayoutConnector';
import DesktopLayout from './desktop-layout/DesktopLayout';

function _handleViewportChange(onViewportChange) {
  return (ev) => {
    onViewportChange(getViewport());
  }
}

const App = create({
  displayName: 'MyndfullApp',
  propTypes: {
    onViewportChange: React.PropTypes.func.isRequired
  },
  componentWillMount() {
    global.addEventListener('resize', _handleViewportChange(this.props.onViewportChange));
  },
  render() {
    const { dragging, clientInfo, activeView } = this.props;
    return (
      <div className={cn(
        'vh100',
        {
          'dragging-element': dragging
        }
      )}>
        {!clientInfo.isMobile() &&
        <DesktopLayout />
        ||
        <MobileLayoutConnector />
        }
        <DraggingIndicator />
      </div>
    );
  }
});

export default App;
