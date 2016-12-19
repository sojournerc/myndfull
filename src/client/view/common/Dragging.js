
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import connect from '../connectorFactory';

const mapStateToProps = state => state.dnd;

const mapDispatchToProps = () => ({})

const Dragging = create({
  displayName: 'Dragging',
  propTypes: {
    dragX: React.PropTypes.number.isRequired,
    dragY: React.PropTypes.number.isRequired,
    dragging: React.PropTypes.bool.isRequired,
    draggingItem: React.PropTypes.string
  },
  render() {
    const { dragging, dragX, dragY, draggingItem } = this.props;
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
      <span className="dragging-label pl1">{draggingItem.type}</span>
    </div>
  }
});

export default connect(Dragging, mapStateToProps, mapDispatchToProps);
