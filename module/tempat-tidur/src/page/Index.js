import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Header, Content } from '@simrs/main/src/modules/components';
import IdentitasPasien from './components/IdentitasPasien';
import ListRuangan from './components/ListRuangan';
import FormTempatTidur from './components/FormTempatTidur';
// import './assets/css/styles.css';

function Index() {
  return (
    <>
      <Header title="Form Tempat Tidur" icon="bed" />
      <Content>
        <Grid id="container-tempat-tidur">
          <Grid.Row className="pb-0">
            <Grid.Column>
              <IdentitasPasien />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-0">
            <Grid.Column>
              <ListRuangan />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-0">
            <Grid.Column>
              <FormTempatTidur />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Content>
    </>
  );
}

export default Index;
