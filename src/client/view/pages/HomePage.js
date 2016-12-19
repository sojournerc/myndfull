
import React from 'react';
import cn from 'classnames';
import create from '../componentFactory';
import connect from '../connectorFactory';
import reject from 'lodash/reject';

import { Link } from 'react-router';

import PAGES from '../../constants/pages';

const mapStateToProps = (state) => ({
  activePage: state.ui.activePage
});

const mapDispatchToProps = (dispatch) => ({

});

export const HomePage = create({
  displayName: 'HomePage',
  propTypes: {

  },
  render() {
    return <div id="HomePage" className={cn(
      'h100',
      'w100',
      'flex',
      'flex-column',
      'justify-around',
      'items-center'
    )}>
      {PAGES.map(p => (
        <Link key={p.slug} to={`/${p.slug}`}>
          <span 
            className={cn(
              'h2',
              'flex-item', 
              'center', 
              'p4',
              'theme1-bg',
              'circle'
            )}
          >
            {p.label}
          </span>
        </Link>
      ))}
    </div>
  }
});

export default connect(HomePage, mapStateToProps, mapDispatchToProps);
