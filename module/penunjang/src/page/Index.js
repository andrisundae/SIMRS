import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { Header, Content } from '@simrs/main/src/modules/components';
import { useAppState } from '@simrs/components';
import IdentitasPasien from './components/IdentitasPasien';
import ListPenunjang from './components/ListPenunjang';
import FormPenunjang from './components/FormPenunjang';
import FooterActions from './components/FooterActions';
import KeteranganKelasPasien from './components/KeteranganKelasPasien';
import { openForm } from '../redux/reducer';

function Index() {
  const dispatch = useDispatch();
  const { resource } = useAppState();

  useEffect(() => {
    dispatch(openForm({ resource }));
  }, [openForm, dispatch]);
  return (
    <>
      <Header title="Form Penunjang" icon="phone volume" />
      <Content>
        <IdentitasPasien />
        <Segment className="mt-2 pt-2">
          <KeteranganKelasPasien />
          <ListPenunjang />
          <FormPenunjang />
        </Segment>
      </Content>
      <FooterActions />
    </>
  );
}

export default Index;
