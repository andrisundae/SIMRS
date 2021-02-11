import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import className from 'classname';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';
import MainContent from '@simrs/rekam-medis/src/component/MainContent';
import { Header, Divider, Icon, Table, Button } from 'semantic-ui-react';
import _ from 'lodash';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';

export default function Index() {
  return (
    <Fragment>
      <TopMenu
        title="Delegasi Tugas"
        leftMenus={[{ text: 'Menu Utama', icon: 'chevron left', to: '/main' }]}
      />
      <MainContent></MainContent>
    </Fragment>
  );
}
