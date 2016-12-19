
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';

import dateFormat from 'dateformat';
import { DATE_SIMPLE } from '../../constants/format';

export default create({
  displayName: 'TimeStamp',
  propTypes: {
    time: React.PropTypes.string.isRequired
  },
  render() {
    const { time } = this.props;
    return <div className={cn(
      'nowrap'
    )}>
      {`[${dateFormat(new Date(time), DATE_SIMPLE)}]`}
    </div>
  }
});
