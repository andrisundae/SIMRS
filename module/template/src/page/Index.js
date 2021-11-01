import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';
import MainContent from '@simrs/rekam-medis/src/component/MainContent';
import List from '../component/List';

import { resetState } from '../reducer/list';

export default function Index() {
  const dispatch = useDispatch();

  function resetToInitialState() {
    dispatch(resetState());
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
            onClick: resetToInitialState,
          },
        ]}
      />
      <MainContent>
        <div className="p-5 h-full overflow-y-auto">
          <List />
        </div>
      </MainContent>
    </Fragment>
  );
}
