import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';
import MainContent from '@simrs/rekam-medis/src/component/MainContent';
import Sidebar from '../component/Sidebar';
import Content from '../component/Content';
import rootReducer from '../reducer';

const store = configureStore({
  reducer: rootReducer,
});

export default function Main() {
  return (
    <Fragment>
      <TopMenu
        title="Antrian Kunjungan Penunjang"
        leftMenus={[{ text: 'Menu Utama', icon: 'chevron left', to: '/main' }]}
      />
      <MainContent>
        <Provider store={store}>
          <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 h-full">
            <Sidebar type="penunjang" />
            <Content type="penunjang" />
          </div>
        </Provider>
      </MainContent>
    </Fragment>
  );
}
