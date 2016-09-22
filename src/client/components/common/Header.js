
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import DropDownMenu from 'material-ui/DropDownMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import MAIN_VIEWS, {
  LOG_VIEW,
  GOAL_VIEW,
  TASK_VIEW
} from '../../constants/main-views';

export default create({
  displayName: 'Header',
  propTypes: {
    isMobile: React.PropTypes.bool.isRequired,
    activeView: React.PropTypes.oneOf([LOG_VIEW, GOAL_VIEW, TASK_VIEW]),
    onViewChange: React.PropTypes.func.isRequired
  },
  _handleNavChange(e,v,s) {
    this.props.onViewChange(s);
  },
  render() {
    const { activeView } = this.props;
    return <div id="Header" className={cn(
      'border-bottom'
    )}>
      <div className={cn('h1', 'px2', 'h100')}>
        <div className="flex flex-row justify-between items-center h100">
          <div className="flex-s-50">{'Myndfull'}</div>
          {this.props.isMobile &&
          <div className="flex-item">
            <DropDownMenu
              value={activeView}
              onChange={this._handleNavChange}
              labelStyle={{ paddingRight: '24px', color: 'inherit' }}
              underlineStyle={{ borderTop: 'none' }}
              style={{ fontSize: '1.3rem', height: 'auto' }}
              iconStyle={{ 'right': 0 }}
            >
              {MAIN_VIEWS.map(view => <MenuItem value={view.slug} primaryText={view.label} key={view.slug} />)}
            </DropDownMenu>
          </div>}
        </div>
      </div>
    </div>
  }
});
