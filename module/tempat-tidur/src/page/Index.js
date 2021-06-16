import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Header, Content } from '@simrs/main/src/modules/components';
import IdentitasPasien from './components/IdentitasPasien';
import './assets/css/styles.css';

function Index() {
  return (
    <>
      <Header title="Form Tempat Tidur" icon="bed" />
      <Content>
        <Grid id="container-tempat-tidur">
          <Grid.Row>
            <Grid.Column>
              <IdentitasPasien />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Content>
    </>
  );
}

export default Index;
