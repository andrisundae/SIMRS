import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import className from 'classname';
import {
  Header,
  Divider,
  Icon,
  Button,
  Tab,
  Menu,
  Label,
} from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';

import DokumenMRSContainer from './DokumenMRSContainer';
import DokumenKerjasamaMedisContainer from './DokumenKerjasamaMedisContainer';
import DokumenPenunjangContainer from './DokumenPenunjangContainer';
import DokumenMedisLainContainer from './DokumenMedisLainContainer';
import DokumenKRSContainer from './DokumenKRSContainer';
import DokumenAdministrasiContainer from './DokumenAdministrasiContainer';

export default function Index() {
  const history = useHistory();
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Fragment>
      <FooterActionsContainer>
        <div className="m-1">
          <Button
            icon="plus"
            content="Tambah"
            color="blue"
            onClick={() => {
              const query = new URLSearchParams();
              query.append('kode', '');

              history.push({
                pathname: location.pathname + '/add',
                search: query.toString(),
              });
            }}
          />
        </div>
      </FooterActionsContainer>
      <Header className="mt-0">
        <Icon name="file alternate" className="text-lg -mt-4" />
        <Header.Content>Dokumen</Header.Content>
      </Header>
      <Divider />
      <Tab
        className="-mt-4"
        menu={{
          className: 'sticky pt-5 -top-5 z-20 bg-white',
          attached: true,
          tabular: true,
        }}
        panes={[
          {
            menuItem: (
              <Menu.Item
                key="dokumen_mrs"
                className={className('', {
                  // 'bg-blue-500 text-white': activeIndex === 0,
                })}
                onClick={() => setActiveIndex(0)}
              >
                Dokumen MRS
              </Menu.Item>
            ),
            render: () => (
              <Tab.Pane>
                <DokumenMRSContainer />
              </Tab.Pane>
            ),
          },
          {
            menuItem: {
              key: 'dokumen_kerjasama_medis',
              content: 'Dokumen Kerjasama Medis',
              className: className('', {
                // 'bg-blue-500 text-white': activeIndex === 1,
              }),
              onClick: () => setActiveIndex(1),
            },
            render: () => (
              <Tab.Pane>
                <DokumenKerjasamaMedisContainer />
              </Tab.Pane>
            ),
          },
          {
            menuItem: {
              key: 'dokumen_penunjang',
              content: 'Dokumen Penunjang',
              className: className('', {
                // 'bg-blue-500 text-white': activeIndex === 2,
              }),
              onClick: () => setActiveIndex(2),
            },
            render: () => (
              <Tab.Pane>
                <DokumenPenunjangContainer />
              </Tab.Pane>
            ),
          },
          {
            menuItem: {
              key: 'dokumen_medis_lain',
              content: 'Dokumen Medis Lainnya',
              className: className('', {
                // 'bg-blue-500 text-white': activeIndex === 3,
              }),
              onClick: () => setActiveIndex(3),
            },
            render: () => (
              <Tab.Pane>
                <DokumenMedisLainContainer />
              </Tab.Pane>
            ),
          },
          {
            menuItem: {
              key: 'dokumen_krs',
              content: 'Dokumen KRS',
              className: className('', {
                // 'bg-blue-500 text-white': activeIndex === 4,
              }),
              onClick: () => setActiveIndex(4),
            },
            render: () => (
              <Tab.Pane>
                <DokumenKRSContainer />
              </Tab.Pane>
            ),
          },
          {
            menuItem: {
              key: 'dokumen_administrasi',
              content: 'Dokumen Administrasi',
              className: className('', {
                // 'bg-blue-500 text-white': activeIndex === 5,
              }),
              onClick: () => setActiveIndex(5),
            },
            render: () => (
              <Tab.Pane>
                <DokumenAdministrasiContainer />
              </Tab.Pane>
            ),
          },
        ]}
      />
    </Fragment>
  );
}
