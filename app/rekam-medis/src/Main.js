import React, { Fragment } from 'react';
import TopMenu from './component/TopMenu';
import MainContent from './component/MainContent';
import MainMenu from './component/MainMenu';

export default function Main() {
  return (
    <Fragment>
      <TopMenu title="Menu Utama" />
      <MainContent>
        <MainMenu />
      </MainContent>
    </Fragment>
  );
}
