
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

function __isDragWithin(pos, el) {
  const boundRect = el.getBoundingClientRect();
  if ((pos.y <= boundRect.bottom && pos.y >= boundRect.top) &&
      (pos.x <= boundRect.right && pos.x >= boundRect.left)) {
    return true;
  }
}

export default create({
  displayName: 'Target',
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    type: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    isTargeted: React.PropTypes.bool.isRequired,
    onDragOver: React.PropTypes.func.isRequired,
    onDragLeave: React.PropTypes.func.isRequired,
    onDragDrop: React.PropTypes.func.isRequired,
    isTouch: React.PropTypes.bool.isRequired,
    dragPos: React.PropTypes.object,
    children: React.PropTypes.node
  },
  // if we're a touch device we need to detect whether
  // the dragPosition is going to be within the container of
  componentWillUpdate(props) {
    const { active, isTouch, isTargeted, dragPos, type, index } = props;
    if (this.props.active && isTouch && (!isTargeted && __isDragWithin(dragPos, this._droppableInner))) {
      this.props.onDragOver({ type, index });
    } else if (isTouch && isTargeted && !__isDragWithin(dragPos, this._droppableInner)) {
      this.props.onDragLeave();
    }
  },
  _handleDragOver(ev) {
    ev.preventDefault();
    if (!this.props.isTargeted) {
      this.props.onDragOver({ type: this.props.type, index: this.props.index });
    }
  },
  _handleDragLeave() {
    this.props.onDragLeave();
  },
  _handleDragDrop() {
    this.props.onDragDrop(this.props.index);
  },
  render() {
    const { active, children, isTargeted } = this.props;
    if (!active) {
      return <span />
    }
    return <div
      onDragOver={this._handleDragOver}
      onDragLeave={this._handleDragLeave}
      onDrop={this._handleDragDrop}
      className={cn(
        'droppable',
        {
          'droppable-mouseover': isTargeted
        }
      )}
    >
      <div
        className='droppable-inner'
        ref={(el) => { this._droppableInner = el; }}
      >
        {children}
      </div>
    </div>
  }
});
