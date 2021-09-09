import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Header, Content } from '@simrs/main/src/modules/components';
import { useAppState } from '@simrs/components';
import IdentitasPasien from './components/IdentitasPasien';
import ListRuangan from './components/ListRuangan';
import FormTempatTidur from './components/FormTempatTidur';
import FooterActions from './components/FooterActions';
import KeteranganKelasPasien from './components/KeteranganKelasPasien';
import { openForm } from '../redux/reducer';
// import './assets/css/styles.css';

function Index() {
  const dispatch = useDispatch();
  const { resource } = useAppState();

  useEffect(() => {
    dispatch(openForm({ resource }));
  }, [openForm, dispatch]);
  return (
    <>
      <Header title="Form Tempat Tidur" icon="bed" />
      <Content>
        <Grid id="container-tempat-tidur">
          <Grid.Row className="pt-2 pb-0">
            <Grid.Column>
              <IdentitasPasien />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-1 pb-1">
            <Grid.Column>
              <KeteranganKelasPasien />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-0 pb-2">
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
      <FooterActions />
    </>
  );
}

export default Index;
