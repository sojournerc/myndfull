
import React from 'react';
import create from './componentFactory';
import connect from './connectorFactory';

import cn from 'classnames';

import { getViewport } from 'dom-util';
import { fetchAll } from '../state/api/actions';
import { viewportChange } from '../state/ui/actions';

import Header from './common/Header';

function mapStateToProps(state, props) {
  return {
    dragging: state.dnd.dragging,
    clientInfo: state.ui.clientInfo
  }
}

const mapDispatchToProps = (dispatch) => ({
  onViewportChange(viewport) {
    dispatch(viewportChange(viewport));
  },
  onViewChange(view) {
    dispatch(activePageChange(view))
  }
})

function _handleViewportChange(onViewportChange) {
  return (ev) => {
    onViewportChange(getViewport());
  }
}

const App = create({
  displayName: 'MyndfullApp',
  propTypes: {

  },
  componentWillMount() {
    global.addEventListener('resize', _handleViewportChange(this.props.onViewportChange));
    fetchAll();
  },
  render() {
    const { dragging, clientInfo } = this.props;
    return (
      <div 
        id="BodyInner"
        className={cn(
        {
          'dragging-element': dragging
        }
      )}>
        <Header />
        {this.props.children} 
      </div>
    );
  }
});

export default connect(App, mapStateToProps, mapDispatchToProps);
