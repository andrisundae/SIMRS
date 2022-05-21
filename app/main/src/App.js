import React, { Suspense, useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container, Grid, Image, Label, Segment } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

import { PageLoader } from '@simrs/components';
import { store } from '@simrs/common';
import createStore from './store';
import { Portal, Login, Server } from './modules';
import MedicineIcon from './static/svg/medicine.svg';

const storeRedux = createStore();

function App() {
  const [isOpenServer, openServer] = useState(false);

  useEffect(() => {
    async function checkServer() {
      try {
        const response = await fetch(store.main.get('config.api'));
        if (response.status) {
          console.log('ok');
        }
      } catch (error) {
        openServer(true);
      }
    }

    if (isEmpty(store.main.get('config.api'))) {
      openServer(true);
    } else {
      checkServer();
    }
    MouseTrap.bind('mod+shift+c', function (e) {
      e.preventDefault();
      openServer(true);
    });

    return () => {
      MouseTrap.unbind('mod+shift+c');
    };
  }, []);

  function _renderLogin(props) {
    return <Login {...props} />;
  }

  function _renderPortal(props) {
    return <Portal {...props} />;
  }

  return (
    <Provider store={storeRedux}>
      <Suspense fallback={<PageLoader active={true} />}>
        <Container>
          <Grid columns={2} className="main-page">
            <Grid.Row className="layout bg-gradient-to-r from-[#2c3e50] to-cyan-500">
              <Grid.Column className="flex items-center justify-center">
                <Segment color="teal" inverted>
                  <Label
                    color="red"
                    ribbon
                    icon="hospital"
                    content="RS. Kusta Sumberglagah"
                  />
                  <Image
                    src={MedicineIcon}
                    // circular
                    className="h-48 mt-3"
                    centered
                  />
                </Segment>
                <div className="absolute bottom-5">
                  2018 <span dangerouslySetInnerHTML={{ __html: '&copy;' }} />{' '}
                  {process.env.REACT_APP_AUTHOR}
                </div>
              </Grid.Column>
              <Grid.Column className="main-content bg-[#2c3e50] flex items-center justify-center">
                <Router>
                  <Switch>
                    <Route exact path="/" render={_renderLogin} />
                    <Route path="/portal" render={_renderPortal} />
                  </Switch>
                  {isOpenServer && (
                    <Server
                      open={isOpenServer}
                      onClose={() => openServer(false)}
                    />
                  )}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Suspense>
    </Provider>
  );
}

export default App;
