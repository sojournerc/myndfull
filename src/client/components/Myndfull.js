
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
  displayName: 'MyndfullApp',
  propTypes: {
  },
  render() {
    const { dragging } = this.props;

    const showPaneRight = false;
    const showPaneLeft = true;
    const showFooter = true;
    const showHeader = true;

    return <div className={cn(
      'vh100',
      {
        'dragging-element': dragging
      }
    )}>
      {showHeader &&
      <Header>
        <HeaderContent />
      </Header>
      }
      <div id="BodyInner">
        <div className={cn(
          'h100',
          'flex',
          'flex-row'
        )}>
          {showPaneLeft &&
          <PaneLeft>
            <PaneLeftContent />
          </PaneLeft>
          }
          <Main>
            <MainContent />
          </Main>
          {showPaneRight &&
          <PaneRight>
            <PaneRightContent />
          </PaneRight>
          }
        </div>
      </div>
      {showFooter &&
      <Footer>
        <FooterContent />
      </Footer>
      }
      <DraggingIndicator />
    </div>
  }
});

export default App;
