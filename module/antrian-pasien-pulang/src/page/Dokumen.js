import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';
import MainContent from '@simrs/rekam-medis/src/component/MainContent';
import DokumenKlaim from '../component/DokumenKlaim';
import rootReducer from '../reducer';

const store = configureStore({
  reducer: rootReducer,
});

export default function Main() {
  return (
    <Fragment>
      <TopMenu
        title="Dokumen Klaim"
        leftMenus={[
          {
            icon: 'chevron left',
            to: '/antrian/pasien-pulang',
          },
          {
            divider: true,
          },
          { text: 'Menu Utama', icon: 'list layout', to: '/main' },
        ]}
      />
      <MainContent>
        <Provider store={store}>
          <DokumenKlaim />
        </Provider>
      </MainContent>
    </Fragment>
  );
}
