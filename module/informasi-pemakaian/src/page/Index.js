import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { Header, Content } from '@simrs/main/src/modules/components';
import { useAppState } from '@simrs/components';
import MasterForm from './components/MasterForm';
import { openForm } from '../redux/reducer';
import DataList from './components/DataList';
import DetailForm from './components/DetailForm';
import FooterActions from './components/FooterActions';

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
        <Segment className="py-2 my-2">
          <MasterForm />
        </Segment>
        <Segment className="py-2 my-2">{/* <DataList /> */}</Segment>
        <Segment className="py-2 my-2">
          <DetailForm />
        </Segment>
      </Content>
      <FooterActions />
    </>
  );
}

export default Index;
