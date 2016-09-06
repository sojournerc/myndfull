
import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import create from '../componentFactory';

import TimeStamp from '../common/TimeStamp';

export default create({
  displayName: 'Entry',
  propTypes: {
    entry: React.PropTypes.object.isRequired,
    isLast: React.PropTypes.bool.isRequired
  },
  componentDidMount() {
    // show the latest entry (at the bottom of the pane)
    if (this.props.isLast) {
      ReactDOM.findDOMNode(this).scrollIntoView(false);
    }
  },
  render() {
    const { entry } = this.props;
    return <div className={cn(
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
        <div className="flex-gs-item pl1">
          {entry.text}
        </div>
      </div>
    </div>
  }
});
