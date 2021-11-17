import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header, Content } from '@simrs/main/src/modules/components';
import { useAppState } from '@simrs/components';
import IdentitasPasien from './components/IdentitasPasien';
import ListRuangan from './components/ListRuangan';
import FormTempatTidur from './components/FormTempatTidur';
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
      <Header title="Form Tempat Tidur" icon="bed" />
      <Content>
        <IdentitasPasien />
        <KeteranganKelasPasien />
        <ListRuangan />
        <FormTempatTidur />
      </Content>
      <FooterActions />
    </>
  );
}

export default Index;
