import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';
import MainContent from '@simrs/rekam-medis/src/component/MainContent';
import FormTemplate from '../component/FormTemplate';

export default function Template() {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <TopMenu
        title="Form Format Dokumen Rekam Medis"
        leftMenus={[
          {
            icon: 'chevron left',
            to: '/template',
          },
          {
            divider: true,
          },
          { text: 'Menu Utama', icon: 'list layout', to: '/main' },
        ]}
      />
      <MainContent>
        <div className="p-5 h-full overflow-y-auto">
          <FormTemplate />
        </div>
      </MainContent>
    </Fragment>
  );
}
