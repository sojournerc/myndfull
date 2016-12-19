
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import connect from '../connectorFactory';

import EntryPane from '../core/EntryPane';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export const LogPage = create({
  displayName: 'LogPage',
  propTypes: {
  },
  render() {
    const { } = this.props;
    return <div id="LogPage" className={cn(
      'h100'
    )}>
      <div className={cn(
        'h100',
        'w100'
      )}>
        <EntryPane />
      </div>
    </div>
  }
});

export default connect(LogPage, mapStateToProps, mapDispatchToProps);
