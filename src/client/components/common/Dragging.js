
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

export default create({
  displayName: 'Dragging',
  propTypes: {
    dragX: React.PropTypes.number.isRequired,
    dragY: React.PropTypes.number.isRequired,
    dragging: React.PropTypes.bool.isRequired,
    draggingType: React.PropTypes.string
  },
  render() {
    const { dragging, dragX, dragY, draggingType } = this.props;
    if (!dragging) {
      return <span />;
    }
    return <div
      className={cn(
        'dragging-indicator',
        'fixed',
        'py1',
        'px2',
        'rounded',
        'box-shadow'
      )}
      style={{
        left: dragX,
        top: dragY
      }}
    >
      <span className="dragging-arrow pr1">⤪</span>
      <span className="dragging-label pl1">{draggingType}</span>
    </div>
  }
});
