
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import connect from '../connectorFactory';

import { store } from '../../state';

import EntryModel from '../../models/EntryModel';
import Entry from './Entry';

const mapStateToProps = (state) => ({
  entries: state.api.entries.items
});

const mapDispatchToProps = (dispatch) => ({
  onFetch() {
    dispatch(EntryModel.fetch());
  }
});

const EntryList = create({
  displayName: 'EntryList',
  propTypes: {
    entries: React.PropTypes.array.isRequired,
    onFetch: React.PropTypes.func.isRequired
  },
  componentWillMount() {
    this.props.onFetch();
  },
  render() {
    const { entries } = this.props;
    return <div className={cn(
      'mh100',
      'list'
    )}>
      {entries.map((entry, i) => (
        <Entry 
          key={i} 
          entry={entry} 
          isLast={(i === entries.length - 1)} 
        />
      ))}
    </div>
  }
});

export default connect(EntryList, mapStateToProps, mapDispatchToProps);
