
import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import create from '../componentFactory';
import connect from '../connectorFactory';

import Linkify from 'react-linkify';
import TimeStamp from '../common/TimeStamp';
import { RemoveButton } from '../common/Buttons';
import { scrollIntoView } from 'dom-util';

const mapStateToProps = (state) => ({
  // TODO -> use this.context instead - since it is pervasive
  isMobile: state.ui.clientInfo.isMobile()
});

const mapDispatchToProps = (dispatch) => ({});

const Entry = create({
  displayName: 'Entry',
  propTypes: {
    entry: React.PropTypes.object.isRequired,
    isLast: React.PropTypes.bool.isRequired,
    isMobile: React.PropTypes.bool.isRequired
  },
  componentDidMount() {
    // show the latest entry (at the bottom of the pane)
    if (this.props.isLast) {
      scrollIntoView(this);
    }
  },
  _handleRemoveClick() {
    this.props.entry.remove();
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
      </div>
    </div>
  }
});

export default connect(Entry, mapStateToProps, mapDispatchToProps);
