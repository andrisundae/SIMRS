import React, { Fragment, useState } from 'react';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';
import MainContent from '@simrs/rekam-medis/src/component/MainContent';
import { Tab } from 'semantic-ui-react';
import className from 'classname';

import ListPermintaan from './ListPermintaan';
import ListAntrian from './ListAntrian';

export default function Index() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Fragment>
      <TopMenu
        title="Rawat Bersama"
        leftMenus={[{ text: 'Menu Utama', icon: 'chevron left', to: '/main' }]}
      />
      <MainContent>
        <Tab
          className="m-5"
          activeIndex={activeIndex}
          panes={[
            {
              menuItem: {
                key: 'list-permintaan',
                icon: 'send',
                content: 'Permintaan Rawat Bersama',
                className: className('', {
                  'bg-blue-600': activeIndex === 0,
                  'text-white': activeIndex === 0,
                }),
                onClick: () => setActiveIndex(0),
              },
              render: () => (
                <Tab.Pane>
                  <ListPermintaan />
                </Tab.Pane>
              ),
            },
            {
              menuItem: {
                key: 'list-antrian',
                icon: 'bed',
                content: 'Antrian Rawat Bersama',
                className: className('', {
                  'bg-blue-600': activeIndex === 1,
                  'text-white': activeIndex === 1,
                }),
                onClick: () => setActiveIndex(1),
              },
              render: () => (
                <Tab.Pane>
                  <ListAntrian />
                </Tab.Pane>
              ),
            },
          ]}
        />
      </MainContent>
    </Fragment>
  );
}
