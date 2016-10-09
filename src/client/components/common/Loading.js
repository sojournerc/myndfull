
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

export default create({
  displayName: 'Loading',
  render() {
    return <div className="loading-wrap">
      <div className="loading-inner">
        <div 
          className="uil-ripple-css"
          style={{ transform: 'scale(0.21)' }}
        >
          <div />
          <div />
        </div>
      </div>
    </div>
  }
});
