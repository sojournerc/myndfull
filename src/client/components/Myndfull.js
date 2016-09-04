
import React from 'react';
import create from './componentFactory';
import cn from 'classnames';

/** Layout Elements */
import Header from './layout/Header';
import Footer from './layout/Footer';
import PaneLeft from './layout/PaneLeft';
import Main from './layout/Main';
import PaneRight from './layout/PaneRight';

/** Content Elements */
import HeaderContent from './content/HeaderContent';
import PaneLeftContent from './content/PaneLeftContent';
import PaneRightContent from './content/PaneRightContent';
import MainContent from './content/MainContent';
import FooterContent from './content/FooterContent';

import DraggingIndicator from '../connectors/DraggingIndicator';

const App = create({
  displayName: 'Designer',
  propTypes: {
    mode: React.PropTypes.string.isRequired,
    onModeChange: React.PropTypes.func.isRequired
  },
  render() {
    const { mode, onModeChange, dragging } = this.props;

    const showPaneRight = false;
    const showPaneLeft = true;
    const showFooter = false;
    const showHeader = true;

    return <div className={cn(
      'vh100',
      'flex',
      'flex-column',
      {
        'dragging-element': dragging
      }
    )}>
      {showHeader &&
      <Header>
        <HeaderContent mode={mode} />
      </Header>
      }
      <div className={cn('flex-gs-80')}>
        <div className={cn(
          'h100',
          'flex',
          'flex-row'
        )}>
          {showPaneLeft &&
          <PaneLeft>
            <PaneLeftContent mode={mode} />
          </PaneLeft>
          }
          <Main>
            <MainContent mode={mode} />
          </Main>
          {showPaneRight &&
          <PaneRight>
            <PaneRightContent mode={mode} />
          </PaneRight>
          }
        </div>
      </div>
      {showFooter &&
      <Footer>
        <FooterContent mode={mode} />
      </Footer>
      }
      <DraggingIndicator />
    </div>
  }
});

export default App;
