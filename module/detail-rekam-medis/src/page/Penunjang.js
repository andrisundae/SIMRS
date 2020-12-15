import React, { Fragment } from 'react';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';

export default function Main() {
  return (
    <Fragment>
      <TopMenu
        title="Detail Kunjungan Penunjang"
        leftMenus={[
          {
            icon: 'chevron left',
            to: '/antrian/penunjang',
          },
          {
            divider: true,
          },
          { text: 'Menu Utama', icon: 'list layout', to: '/main' },
        ]}
      />
    </Fragment>
  );
}
