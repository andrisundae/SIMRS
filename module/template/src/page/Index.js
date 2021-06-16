import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';
import MainContent from '@simrs/rekam-medis/src/component/MainContent';
import List from '../component/List';

import { resetToInitialState } from '../reducer/content';

export default function Index() {
  const dispatch = useDispatch();

  function resetState() {
    dispatch(resetToInitialState());
  }

  return (
    <Fragment>
      <TopMenu
        title="Template Dokumen"
        leftMenus={[
          {
            text: 'Menu Utama',
            icon: 'chevron left',
            to: '/main',
            onClick: resetState,
          },
        ]}
      />
      <MainContent>
        <div className="m-5">
          <List />
        </div>
      </MainContent>
    </Fragment>
  );
}
