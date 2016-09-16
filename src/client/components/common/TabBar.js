
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

export default create({
  displayName: 'TabBar',
  propTypes: {
    tabs: React.PropTypes.array.isRequired,
    activeTab: React.PropTypes.string.isRequired
  },
  render() {
    const { tabs, activeTab } = this.props;
    return <div className={cn(
      'flex',
      'flex-row',
      'items-stretch'
    )}>
      {tabs.map(tab => {
        return <div
          className={cn('flex-item', { 'active-tab': tab.slug === activeTab })}
        >
          {tab.label}
        </div>
      })}
    </div>
  }
});
