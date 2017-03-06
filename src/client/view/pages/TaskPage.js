
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import connect from '../connectorFactory';

import Pane from '../core/Pane';
import TaskModel from '../../models/TaskModel';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export const TaskPage = create({
  displayName: 'TaskPage',
  propTypes: {
  },
  render() {
    const { } = this.props;
    return <div id="TaskPage" className={cn(
      'h100'
    )}>
      <div className={cn(
        'h100',
        'w100'
      )}>
        <Pane
          onShowForm={() => {}}
          onHideForm={() => {}}
          ItemClass={TaskModel}
        />
      </div>
    </div>
  }
});

export default connect(TaskPage, mapStateToProps, mapDispatchToProps);
