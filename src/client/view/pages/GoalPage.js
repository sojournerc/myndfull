
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import connect from '../connectorFactory';

import Pane from '../core/Pane';
import GoalModel from '../../models/GoalModel';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export const GoalPage = create({
  displayName: 'GoalPage',
  propTypes: {
  },
  render() {
    const { } = this.props;
    return <div id="GoalPage" className={cn(
      'h100'
    )}>
      <div className={cn(
        'h100',
        'w100'
      )}>
        <Pane 
          ItemClass={GoalModel}
        />  
      </div>
    </div>
  }
});

export default connect(GoalPage, mapStateToProps, mapDispatchToProps);
