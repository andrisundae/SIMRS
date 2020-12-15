import React, { Fragment } from 'react';
import TopMenu from './component/TopMenu';
import MainMenu from './component/MainMenu';

export default function Main() {
  return (
    <Fragment>
      <TopMenu title="Menu Utama" />
      <MainMenu />
    </Fragment>
  );
}
