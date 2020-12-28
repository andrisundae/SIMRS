import React, { Fragment } from 'react';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';
import MainContent from '@simrs/rekam-medis/src/component/MainContent';
import Sidebar from '../component/Sidebar';
import Content from '../component/Content';

export default function Main() {
  return (
    <Fragment>
      <TopMenu
        title="Antrian Kunjungan Penunjang"
        leftMenus={[{ text: 'Menu Utama', icon: 'chevron left', to: '/main' }]}
      />
      <MainContent>
        <div className="grid grid-cols-6 h-full">
          <Sidebar type="penunjang" />
          <Content type="penunjang" />
        </div>
      </MainContent>
    </Fragment>
  );
}
