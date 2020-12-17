import React, { Fragment } from 'react';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';
import SidebarMenu from '../component/Sidebar';

export default function Main() {
  return (
    <Fragment>
      <TopMenu
        title="Detail Kunjungan Umum"
        leftMenus={[
          {
            icon: 'chevron left',
            to: '/antrian/umum',
          },
          {
            divider: true,
          },
          { text: 'Menu Utama', icon: 'list layout', to: '/main' },
        ]}
      />
      <SidebarMenu umum />
    </Fragment>
  );
}
