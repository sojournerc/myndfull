
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
    onRemoveItem: React.PropTypes.func.isRequired
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
    const { entry } = this.props;
    return <div className={cn(
      'list-item',
      'flex-item',
      'p2'
    )}>
      <div className={cn(
        'flex',
        'flex-row',
        'items-center'
      )}>
        <div className="flex-item pr1 mid-color">
          <TimeStamp time={entry.createdAt} />
        </div>
        <div className="flex-gs-item pl1 prewrap">
          <Linkify properties={{ target: '_blank' }}>{entry.text}</Linkify>
        </div>
        <div className="flex-item item-controls">
          <RemoveButton onClick={this._handleRemoveClick} />
        </div>
      </div>
    </div>
  }
});
