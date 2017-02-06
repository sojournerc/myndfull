
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import { IndexLink } from 'react-router';

import PAGES from '../../constants/pages';

export default create({
  displayName: 'Header',
  propTypes: {
  },
  _handleNavChange(e,v,s) {
    this.props.onViewChange(s);
  },
  render() {
    return <div id="Header" className={cn(
      'border-bottom'
    )}>
      <div className={cn('h4', 'p2')}>
        <div className="flex flex-row justify-between items-center h100">
          <div className="flex-s-50">{'Myndfull'}</div>
          <IndexLink to={'/home'}>Home</IndexLink>
        </div>
      </div>
    </div>
  }
});
