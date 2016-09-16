
import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import create from '../componentFactory';

import Linkify from 'react-linkify';
import TimeStamp from '../common/TimeStamp';
import { RemoveButton } from '../common/Buttons';
import { scrollIntoView } from 'dom-util';

export default create({
  displayName: 'Entry',
  propTypes: {
    entry: React.PropTypes.object.isRequired,
    isLast: React.PropTypes.bool.isRequired,
    onRemoveItem: React.PropTypes.func.isRequired,
    isMobile: React.PropTypes.bool.isRequired
  },
  componentDidMount() {
    // show the latest entry (at the bottom of the pane)
    if (this.props.isLast) {
      scrollIntoView(this);
    }
  },
  _handleRemoveClick() {
    this.props.onRemoveItem(this.props.entry.id);
  },
  render() {
    const { entry, isMobile } = this.props;
    return <div className={cn(
      'flex-item',
      'p2'
    )}>
      <div className={cn('flex', 'flex-row', 'items-center', { 'flex-wrap': isMobile })}>
        <div className={cn(
          'pr1',
          'mid-color',
          {
            'flex-item': !isMobile,
            'flex-gs-100': isMobile
          }
        )}>
          <TimeStamp time={entry.createdAt} />
        </div>
        <div className={cn(
          'flex-gs-item',
          'prewrap',
          'break-word',
          'pr1',
          'line-height-4',
          {
            pl1: !isMobile,
            mt1: isMobile
          })}
          style={{ minWidth: 0 }}
        >
          <Linkify properties={{ target: '_blank' }}>{entry.text}</Linkify>
        </div>
        <div className="flex-item">
          <RemoveButton onClick={this._handleRemoveClick} />
        </div>
      </div>
    </div>
  }
});
