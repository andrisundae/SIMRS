import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';

export default function Main() {
  return (
    <Fragment>
      <TopMenu
        title="Antrian Kunjungan Umum"
        leftMenus={[{ text: 'Menu Utama', icon: 'chevron left', to: '/main' }]}
      />
      <Link to="/detail-rekam-medis/umum">Simulasi ke detail rekam medis</Link>
    </Fragment>
  );
}
