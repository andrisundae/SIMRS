import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header, Content } from '@simrs/main/src/modules/components';
import { useAppState } from '@simrs/components';
import Filter from './components/Filter';
import List from './components/List';
import { openForm } from '../redux/reducer';

function Index() {
  const dispatch = useDispatch();
  const { resource } = useAppState();

  useEffect(() => {
    dispatch(openForm({ resource }));
  }, [openForm, dispatch]);
  return (
    <>
      <Header title="Daftar Antrian Penunjang" icon="list" />
      <Content>
        <Filter />
        <div className="mt-3 mb-2">
          <List />
        </div>
      </Content>
    </>
  );
}

export default Index;
